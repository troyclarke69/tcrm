using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tcrm.Api.Data;
using Tcrm.Api.DTOs;
using Tcrm.Api.Models;

namespace Tcrm.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class ActivitiesController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityResponse>>> GetAll([FromQuery] Guid? contactId)
    {
        var query = dbContext.Activities
            .Include(a => a.Contact)
            .Include(a => a.User)
            .AsQueryable();

        if (contactId.HasValue)
        {
            query = query.Where(a => a.ContactId == contactId.Value);
        }

        var activities = await query
            .OrderByDescending(a => a.OccurredAtUtc)
            .Select(a => new ActivityResponse(
                a.Id,
                a.Title,
                a.Details,
                a.Type,
                a.OccurredAtUtc,
                a.ContactId,
                a.Contact != null ? $"{a.Contact.FirstName} {a.Contact.LastName}".Trim() : "Unknown Contact",
                a.UserId,
                a.User != null ? $"{a.User.FirstName} {a.User.LastName}".Trim() : null))
            .ToListAsync();

        return Ok(activities);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Activity>> GetById(Guid id)
    {
        var activity = await dbContext.Activities
            .Include(a => a.Contact)
            .Include(a => a.User)
            .FirstOrDefaultAsync(a => a.Id == id);

        return activity is null ? NotFound() : Ok(activity);
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> Create(CreateActivityRequest request)
    {
        var contactExists = await dbContext.Contacts.AnyAsync(c => c.Id == request.ContactId);
        if (!contactExists)
        {
            return BadRequest("Contact not found.");
        }

        var activity = new Activity
        {
            Title = request.Title.Trim(),
            Details = request.Details.Trim(),
            Type = request.Type,
            OccurredAtUtc = request.OccurredAtUtc,
            ContactId = request.ContactId,
            UserId = request.UserId
        };

        dbContext.Activities.Add(activity);
        await dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = activity.Id }, activity);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Activity>> Update(Guid id, UpdateActivityRequest request)
    {
        var activity = await dbContext.Activities.FindAsync(id);
        if (activity is null)
        {
            return NotFound();
        }

        activity.Title = request.Title.Trim();
        activity.Details = request.Details.Trim();
        activity.Type = request.Type;
        activity.OccurredAtUtc = request.OccurredAtUtc;
        activity.ContactId = request.ContactId;
        activity.UserId = request.UserId;

        await dbContext.SaveChangesAsync();
        return Ok(activity);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var activity = await dbContext.Activities.FindAsync(id);
        if (activity is null)
        {
            return NotFound();
        }

        dbContext.Activities.Remove(activity);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}

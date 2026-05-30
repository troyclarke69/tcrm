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
public class DealsController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DealResponse>>> GetAll()
    {
        var deals = await dbContext.Deals
            .Include(d => d.Contact)
            .Include(d => d.Owner)
            .OrderByDescending(d => d.CreatedAtUtc)
            .Select(d => new DealResponse(
                d.Id,
                d.Title,
                d.Value,
                d.Stage,
                d.ExpectedCloseDateUtc,
                d.Notes,
                d.ContactId,
                d.Contact != null ? $"{d.Contact.FirstName} {d.Contact.LastName}".Trim() : "Unknown Contact",
                d.OwnerId,
                d.Owner != null ? $"{d.Owner.FirstName} {d.Owner.LastName}".Trim() : null,
                d.CreatedAtUtc))
            .ToListAsync();

        return Ok(deals);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Deal>> GetById(Guid id)
    {
        var deal = await dbContext.Deals
            .Include(d => d.Contact)
            .Include(d => d.Owner)
            .FirstOrDefaultAsync(d => d.Id == id);

        return deal is null ? NotFound() : Ok(deal);
    }

    [HttpPost]
    public async Task<ActionResult<Deal>> Create(CreateDealRequest request)
    {
        var contactExists = await dbContext.Contacts.AnyAsync(c => c.Id == request.ContactId);
        if (!contactExists)
        {
            return BadRequest("Contact not found.");
        }

        var deal = new Deal
        {
            Title = request.Title.Trim(),
            Value = request.Value,
            Stage = request.Stage,
            ExpectedCloseDateUtc = request.ExpectedCloseDateUtc,
            Notes = request.Notes.Trim(),
            ContactId = request.ContactId,
            OwnerId = request.OwnerId
        };

        dbContext.Deals.Add(deal);
        await dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = deal.Id }, deal);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Deal>> Update(Guid id, UpdateDealRequest request)
    {
        var deal = await dbContext.Deals.FindAsync(id);
        if (deal is null)
        {
            return NotFound();
        }

        deal.Title = request.Title.Trim();
        deal.Value = request.Value;
        deal.Stage = request.Stage;
        deal.ExpectedCloseDateUtc = request.ExpectedCloseDateUtc;
        deal.Notes = request.Notes.Trim();
        deal.ContactId = request.ContactId;
        deal.OwnerId = request.OwnerId;

        await dbContext.SaveChangesAsync();
        return Ok(deal);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deal = await dbContext.Deals.FindAsync(id);
        if (deal is null)
        {
            return NotFound();
        }

        dbContext.Deals.Remove(deal);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}

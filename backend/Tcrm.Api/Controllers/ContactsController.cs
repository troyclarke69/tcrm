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
public class ContactsController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContactResponse>>> GetAll()
    {
        var contacts = await dbContext.Contacts
            .Include(c => c.Deals)
            .Include(c => c.Activities)
            .OrderByDescending(c => c.CreatedAtUtc)
            .Select(c => new ContactResponse(
                c.Id,
                c.FirstName,
                c.LastName,
                c.Email,
                c.Phone,
                c.Company,
                c.Notes,
                c.CreatedAtUtc,
                c.Deals.Count,
                c.Activities.Count))
            .ToListAsync();

        return Ok(contacts);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Contact>> GetById(Guid id)
    {
        var contact = await dbContext.Contacts
            .Include(c => c.Deals)
            .Include(c => c.Activities)
            .FirstOrDefaultAsync(c => c.Id == id);

        return contact is null ? NotFound() : Ok(contact);
    }

    [HttpPost]
    public async Task<ActionResult<Contact>> Create(CreateContactRequest request)
    {
        var contact = new Contact
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = request.Email.Trim(),
            Phone = request.Phone.Trim(),
            Company = request.Company.Trim(),
            Notes = request.Notes.Trim()
        };

        dbContext.Contacts.Add(contact);
        await dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Contact>> Update(Guid id, UpdateContactRequest request)
    {
        var contact = await dbContext.Contacts.FindAsync(id);
        if (contact is null)
        {
            return NotFound();
        }

        contact.FirstName = request.FirstName.Trim();
        contact.LastName = request.LastName.Trim();
        contact.Email = request.Email.Trim();
        contact.Phone = request.Phone.Trim();
        contact.Company = request.Company.Trim();
        contact.Notes = request.Notes.Trim();

        await dbContext.SaveChangesAsync();
        return Ok(contact);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var contact = await dbContext.Contacts.FindAsync(id);
        if (contact is null)
        {
            return NotFound();
        }

        dbContext.Contacts.Remove(contact);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}

namespace Tcrm.Api.DTOs;

public record CreateContactRequest(
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Company,
    string Notes);

public record UpdateContactRequest(
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Company,
    string Notes);

public record ContactResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Company,
    string Notes,
    DateTime CreatedAtUtc,
    int DealCount,
    int ActivityCount);

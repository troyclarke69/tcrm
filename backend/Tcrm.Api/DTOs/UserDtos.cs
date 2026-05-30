namespace Tcrm.Api.DTOs;

public record UserResponse(Guid Id, string FirstName, string LastName, string Email, DateTime CreatedAtUtc);
public record CreateUserRequest(string FirstName, string LastName, string Email, string Password);
public record UpdateUserRequest(string FirstName, string LastName, string Email, string? Password);

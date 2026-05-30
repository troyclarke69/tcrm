using Tcrm.Api.Models;

namespace Tcrm.Api.DTOs;
public record CreateActivityRequest(
    string Title,
    string Details,
    ActivityType Type,
    DateTime OccurredAtUtc,
    Guid ContactId,
    Guid? UserId);

public record UpdateActivityRequest(
    string Title,
    string Details,
    ActivityType Type,
    DateTime OccurredAtUtc,
    Guid ContactId,
    Guid? UserId);

public record ActivityResponse(
    Guid Id,
    string Title,
    string Details,
    ActivityType Type,
    DateTime OccurredAtUtc,
    Guid ContactId,
    string ContactName,
    Guid? UserId,
    string? UserName);

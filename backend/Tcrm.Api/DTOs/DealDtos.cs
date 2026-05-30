using Tcrm.Api.Models;

namespace Tcrm.Api.DTOs;

public record CreateDealRequest(
    string Title,
    decimal Value,
    DealStage Stage,
    DateTime? ExpectedCloseDateUtc,
    string Notes,
    Guid ContactId,
    Guid? OwnerId);

public record UpdateDealRequest(
    string Title,
    decimal Value,
    DealStage Stage,
    DateTime? ExpectedCloseDateUtc,
    string Notes,
    Guid ContactId,
    Guid? OwnerId);

public record DealResponse(
    Guid Id,
    string Title,
    decimal Value,
    DealStage Stage,
    DateTime? ExpectedCloseDateUtc,
    string Notes,
    Guid ContactId,
    string ContactName,
    Guid? OwnerId,
    string? OwnerName,
    DateTime CreatedAtUtc);

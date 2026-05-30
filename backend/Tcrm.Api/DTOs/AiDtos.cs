namespace Tcrm.Api.DTOs;

public record SummarizeNotesRequest(string Notes);
public record SummarizeNotesResponse(string Summary);

public record SuggestNextActionRequest(
    string ContactName,
    string? DealStage,
    string Notes,
    string? LastActivity);

public record SuggestNextActionResponse(string SuggestedAction, string Reasoning);

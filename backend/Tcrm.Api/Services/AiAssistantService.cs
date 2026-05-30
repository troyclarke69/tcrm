using Tcrm.Api.DTOs;

namespace Tcrm.Api.Services;

public class AiAssistantService : IAiAssistantService
{
    public SummarizeNotesResponse SummarizeNotes(SummarizeNotesRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Notes))
        {
            return new SummarizeNotesResponse("No notes were provided.");
        }

        var normalized = request.Notes.Trim();
        var clipped = normalized.Length > 220 ? normalized[..220] + "..." : normalized;
        return new SummarizeNotesResponse($"Summary: {clipped}");
    }

    public SuggestNextActionResponse SuggestNextAction(SuggestNextActionRequest request)
    {
        var stage = string.IsNullOrWhiteSpace(request.DealStage) ? "early-stage" : request.DealStage;
        var lastTouch = string.IsNullOrWhiteSpace(request.LastActivity) ? "No recent activity logged" : request.LastActivity;

        return new SuggestNextActionResponse(
            $"Follow up with {request.ContactName} to confirm priorities and propose the next concrete step.",
            $"Based on a {stage} opportunity and the latest context ({lastTouch}), a proactive follow-up is the safest next action.");
    }
}

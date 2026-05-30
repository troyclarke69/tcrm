using Tcrm.Api.DTOs;

namespace Tcrm.Api.Services;

public interface IAiAssistantService
{
    SummarizeNotesResponse SummarizeNotes(SummarizeNotesRequest request);
    SuggestNextActionResponse SuggestNextAction(SuggestNextActionRequest request);
}

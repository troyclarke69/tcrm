using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tcrm.Api.DTOs;
using Tcrm.Api.Services;

namespace Tcrm.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/ai")]
public class AiController(IAiAssistantService aiAssistantService) : ControllerBase
{
    [HttpPost("summarize-notes")]
    public ActionResult<SummarizeNotesResponse> SummarizeNotes(SummarizeNotesRequest request)
    {
        return Ok(aiAssistantService.SummarizeNotes(request));
    }

    [HttpPost("suggest-next-action")]
    public ActionResult<SuggestNextActionResponse> SuggestNextAction(SuggestNextActionRequest request)
    {
        return Ok(aiAssistantService.SuggestNextAction(request));
    }
}

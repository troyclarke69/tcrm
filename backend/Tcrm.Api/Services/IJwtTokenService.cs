using Tcrm.Api.Models;

namespace Tcrm.Api.Services;

public interface IJwtTokenService
{
    string GenerateToken(User user);
}

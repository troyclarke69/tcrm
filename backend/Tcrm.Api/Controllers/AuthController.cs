using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tcrm.Api.Data;
using Tcrm.Api.DTOs;
using Tcrm.Api.Models;
using Tcrm.Api.Services;

namespace Tcrm.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(ApplicationDbContext dbContext, IJwtTokenService jwtTokenService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var exists = await dbContext.Users.AnyAsync(u => u.Email == email);
        if (exists)
        {
            return Conflict("A user with that email already exists.");
        }

        var user = new User
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        return Ok(new AuthResponse(
            jwtTokenService.GenerateToken(user),
            user.Id,
            user.Email,
            $"{user.FirstName} {user.LastName}".Trim()));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid email or password.");
        }

        return Ok(new AuthResponse(
            jwtTokenService.GenerateToken(user),
            user.Id,
            user.Email,
            $"{user.FirstName} {user.LastName}".Trim()));
    }
}

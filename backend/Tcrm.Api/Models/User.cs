namespace Tcrm.Api.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public ICollection<Deal> AssignedDeals { get; set; } = new List<Deal>();
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
}

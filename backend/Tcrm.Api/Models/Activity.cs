namespace Tcrm.Api.Models;

public enum ActivityType
{
    Call,
    Email,
    Meeting,
    Task,
    Note
}

public class Activity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
    public ActivityType Type { get; set; } = ActivityType.Note;
    public DateTime OccurredAtUtc { get; set; } = DateTime.UtcNow;
    public Guid ContactId { get; set; }
    public Guid? UserId { get; set; }

    public Contact? Contact { get; set; }
    public User? User { get; set; }
}

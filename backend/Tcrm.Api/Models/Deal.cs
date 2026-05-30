namespace Tcrm.Api.Models;

public enum DealStage
{
    Prospect,
    Qualified,
    Proposal,
    Negotiation,
    Won,
    Lost
}

public class Deal
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public DealStage Stage { get; set; } = DealStage.Prospect;
    public DateTime? ExpectedCloseDateUtc { get; set; }
    public string Notes { get; set; } = string.Empty;
    public Guid ContactId { get; set; }
    public Guid? OwnerId { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public Contact? Contact { get; set; }
    public User? Owner { get; set; }
}

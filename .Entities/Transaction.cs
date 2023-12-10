using System;
using System.Collections.Generic;

namespace react..Entities;

public partial class Transaction
{
    public long TransId { get; set; }

    public decimal? Amount { get; set; }

    public string? PaymentDate { get; set; }

    public string? AddedBy { get; set; }

    public long? ClientId { get; set; }

    public long? ScheduleId { get; set; }

    public long? LoanId { get; set; }
}

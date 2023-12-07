using System;
using System.Collections.Generic;

namespace react.Entities;

public partial class Schedule
{
    public long Id { get; set; }

    public long? LoanId { get; set; }

    public decimal? Collectables { get; set; }

    public DateTime? Date { get; set; }

    public string? Status { get; set; }
}

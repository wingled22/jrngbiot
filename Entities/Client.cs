using System;
using System.Collections.Generic;

namespace react.Entities;

public partial class Client
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Bday { get; set; }

    public int? Municipal { get; set; }

    public int? Barangay { get; set; }

    public int? Purok { get; set; }

    public string? Address { get; set; }
}

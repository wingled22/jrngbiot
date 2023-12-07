using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace react.Entities;

public partial class OlappContext : DbContext
{
    public OlappContext()
    {
    }

    public OlappContext(DbContextOptions<OlappContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Loan> Loans { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;database=olapp;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.27-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Client");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20)")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .HasColumnName("address");
            entity.Property(e => e.Barangay)
                .HasColumnType("int(11)")
                .HasColumnName("barangay");
            entity.Property(e => e.Bday)
                .HasMaxLength(70)
                .HasColumnName("bday");
            entity.Property(e => e.Email)
                .HasMaxLength(70)
                .HasColumnName("email");
            entity.Property(e => e.Municipal)
                .HasColumnType("int(11)")
                .HasColumnName("municipal");
            entity.Property(e => e.Name)
                .HasMaxLength(70)
                .HasColumnName("name");
            entity.Property(e => e.Purok)
                .HasColumnType("int(11)")
                .HasColumnName("purok");
        });

        modelBuilder.Entity<Loan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Loan");

            entity.Property(e => e.Id).HasColumnType("bigint(20)");
            entity.Property(e => e.AddedInterest)
                .HasPrecision(18, 2)
                .HasColumnName("added_interest");
            entity.Property(e => e.Capital)
                .HasPrecision(18, 2)
                .HasColumnName("capital");
            entity.Property(e => e.ClientId)
                .HasColumnType("bigint(20)")
                .HasColumnName("client_id");
            entity.Property(e => e.DateTime)
                .HasMaxLength(255)
                .HasColumnName("date_time");
            entity.Property(e => e.DeductCbu)
                .HasPrecision(18, 2)
                .HasColumnName("deductCBU");
            entity.Property(e => e.DeductInsurance)
                .HasPrecision(18, 2)
                .HasColumnName("deductInsurance");
            entity.Property(e => e.DueDate)
                .HasColumnType("datetime")
                .HasColumnName("due_Date");
            entity.Property(e => e.Interest)
                .HasPrecision(18, 2)
                .HasColumnName("interest");
            entity.Property(e => e.InterestedAmount)
                .HasPrecision(18, 2)
                .HasColumnName("interested_amount");
            entity.Property(e => e.LoanAmount)
                .HasPrecision(18, 2)
                .HasColumnName("loan_amount");
            entity.Property(e => e.LoanReceivable)
                .HasPrecision(18, 2)
                .HasColumnName("loan_receivable");
            entity.Property(e => e.NoPayment)
                .HasColumnType("int(11)")
                .HasColumnName("no_payment");
            entity.Property(e => e.OtherFee)
                .HasPrecision(18, 2)
                .HasColumnName("other_fee");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.TotalPenalty)
                .HasPrecision(18, 2)
                .HasColumnName("total_penalty");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Schedule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Schedule");

            entity.Property(e => e.Id).HasColumnType("bigint(20)");
            entity.Property(e => e.Collectables)
                .HasPrecision(18, 2)
                .HasColumnName("collectables");
            entity.Property(e => e.Date)
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.LoanId)
                .HasColumnType("bigint(20)")
                .HasColumnName("loan_id");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransId).HasName("PRIMARY");

            entity.ToTable("Transaction");

            entity.Property(e => e.TransId)
                .HasColumnType("bigint(20)")
                .HasColumnName("trans_id");
            entity.Property(e => e.AddedBy)
                .HasMaxLength(255)
                .HasColumnName("added_by");
            entity.Property(e => e.Amount)
                .HasPrecision(18, 2)
                .HasColumnName("amount");
            entity.Property(e => e.ClientId)
                .HasColumnType("bigint(20)")
                .HasColumnName("client_id");
            entity.Property(e => e.LoanId)
                .HasColumnType("bigint(20)")
                .HasColumnName("loan_id");
            entity.Property(e => e.PaymentDate)
                .HasMaxLength(255)
                .HasColumnName("payment_date");
            entity.Property(e => e.ScheduleId)
                .HasColumnType("bigint(20)")
                .HasColumnName("schedule_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

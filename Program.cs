using Microsoft.EntityFrameworkCore;
using react.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<OlappContext>(options =>
    options.UseMySql("server=localhost;database=sampleapp;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.27-mariadb")));


builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

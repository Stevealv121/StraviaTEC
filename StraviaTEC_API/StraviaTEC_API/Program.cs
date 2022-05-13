using StraviaTEC_Data;
using StraviaTEC_Data.Repositories;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var SQLConnectionConfig = new SQLConfig(builder.Configuration.GetConnectionString("ConnectionString"));
builder.Services.AddSingleton(SQLConnectionConfig);

builder.Services.AddScoped<IActivity, RActivity>();
builder.Services.AddScoped<ICategory, RCategory>();
builder.Services.AddScoped<IChallenge, RChallenge>();
builder.Services.AddScoped<IGroup, RGroup>();
builder.Services.AddScoped<IRace, RRace>();
builder.Services.AddScoped<ISponsor, RSponsor>();
builder.Services.AddScoped<ISport, RSport>();
builder.Services.AddScoped<IUser, RUser>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3401")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

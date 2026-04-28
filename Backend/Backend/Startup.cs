using System;
using System.Text;
using Backend.DataAccess;
using Backend.DataAccess.Abstruct;
using Backend.DataAccess.Concrete;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // JWT Key
            var key = Encoding.ASCII.GetBytes(
                Configuration.GetSection("AppSettings:Token").Value
            );

            // PostgreSQL DbContext (FIXED)
            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(
                    Configuration.GetConnectionString("DataDBConnection")
                )
            );

            // CORS (required since you are using AllowAnyOrigin + Credentials before)
            services.AddCors();

            // Controllers (replaces AddMvc)
            services.AddControllers();

            // Dependency Injection
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IMusicDal, EFMusicDal>();

            // JWT Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            // CORS middleware
            app.UseCors(x =>
                x.AllowAnyHeader()
                 .AllowAnyMethod()
                 .AllowAnyOrigin()
            );

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
# ---------- BUILD STAGE ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project file and restore
COPY *.csproj ./
RUN dotnet restore

# Copy all source code
COPY . ./
RUN dotnet publish -c Release -o /app/out

# ---------- RUNTIME STAGE ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Run app on port 5000
ENV ASPNETCORE_URLS=http://+:5000

# Copy published output
COPY --from=build /app/out ./

# Expose port 5000
EXPOSE 5000

# Start app
ENTRYPOINT ["dotnet", "Backend.dll"]

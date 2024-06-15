# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR ./app

# Copy everything and restore dependencies
COPY . .
RUN dotnet restore

# Build the application
RUN dotnet publish -c Release -o out

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR .

# Copy the published app from build stage
COPY --from=build ./app/out .

EXPOSE 8080

# Set the entry point
ENTRYPOINT ["dotnet", "OfferteApp.dll"]

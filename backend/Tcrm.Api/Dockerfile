FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY backend/Tcrm.Api/Tcrm.Api.csproj backend/Tcrm.Api/
RUN dotnet restore backend/Tcrm.Api/Tcrm.Api.csproj

COPY backend/Tcrm.Api backend/Tcrm.Api
WORKDIR /src/backend/Tcrm.Api
RUN dotnet publish Tcrm.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "Tcrm.Api.dll"]

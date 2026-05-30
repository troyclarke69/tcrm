FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Tcrm.Api.csproj ./
RUN dotnet restore Tcrm.Api.csproj

COPY . ./
WORKDIR /src
RUN dotnet publish Tcrm.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "Tcrm.Api.dll"]

# Local Dev Setup

## MySQL setup

Run inside `dev` folder

```bash
docker run --name staff-analytics-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 33007:3306 -v $(pwd)/db-data:/var/lib/mysql -d mysql:latest
```

On windows

```powershell
docker run --name staff-analytics-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 33007:3306 -v ${PWD}/db-data:/var/lib/mysql -d mysql:latest
```

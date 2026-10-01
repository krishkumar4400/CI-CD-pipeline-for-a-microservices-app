# CI/CD pipeline for a microservices app

## Description

A 3-service app (frontend, backend API, database)

complete GitHub Actions pipeline:
> lint → test → Docker build → push to ECR/DockerHub → deploy to Kubernetes. Add rollback on failure

### Tools used

- Github Action
- Docker
- Kubernetes
- Helm
- ECR
- ECS

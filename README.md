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

### Project Structure

```text
microservices-cicd-platform/
│
├── services/
│   │
│   ├── api-gateway/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── config/
│   │   │   └── app.ts
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── middleware/
│   │   │   └── config/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── user-service/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── product-service/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── order-service/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── notification-service/
│       ├── src/
│       ├── tests/
│       ├── Dockerfile
│       ├── package.json
│       └── tsconfig.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── packages/
│   ├── shared-types/
│   ├── shared-utils/
│   └── eslint-config/
│
├── docker/
│   ├── docker-compose.dev.yml
│   ├── docker-compose.test.yml
│   └── docker-compose.prod.yml
│
├── infrastructure/
│   │
│   ├── terraform/
│   │   ├── modules/
│   │   │   ├── vpc/
│   │   │   ├── ec2/
│   │   │   ├── eks/
│   │   │   ├── rds/
│   │   │   ├── ecr/
│   │   │   └── iam/
│   │   │
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── prod/
│   │   │
│   │   └── backend.tf
│   │
│   └── ansible/
│       ├── inventories/
│       ├── playbooks/
│       └── roles/
│
├── kubernetes/
│   │
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── configmap.yaml
│   │   ├── secrets.yaml
│   │   ├── api-gateway.yaml
│   │   ├── auth-service.yaml
│   │   ├── user-service.yaml
│   │   ├── product-service.yaml
│   │   ├── order-service.yaml
│   │   └── notification-service.yaml
│   │
│   ├── overlays/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── prod/
│   │
│   └── ingress/
│       └── ingress.yaml
│
├── helm/
│   └── microservices/
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── values-dev.yaml
│       ├── values-staging.yaml
│       ├── values-prod.yaml
│       └── templates/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── cd-dev.yml
│   │   ├── cd-staging.yml
│   │   ├── cd-production.yml
│   │   ├── security.yml
│   │   └── infrastructure.yml
│   │
│   ├── actions/
│   │   ├── setup-node/
│   │   └── docker-build/
│   │
│   └── dependabot.yml
│
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   │   └── dashboards/
│   └── alertmanager/
│       └── alertmanager.yml
│
├── scripts/
│   ├── build-all.sh
│   ├── test-all.sh
│   ├── docker-build.sh
│   └── deploy.sh
│
├── docs/
│   ├── architecture.md
│   ├── ci-cd.md
│   ├── deployment.md
│   ├── rollback.md
│   └── disaster-recovery.md
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
└── Makefile
```

### System Architecture

```text
                    GitHub
                       │
                       ▼
              ┌─────────────────┐
              │ GitHub Actions  │
              └────────┬────────┘
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
            CI                  CD
             │                   │
      ┌──────┴──────┐            │
      │             │            │
    Test           Build         │
      │             │            │
    Lint       Docker Build      │
      │             │            │
    Scan             │            │
      │             ▼            │
      └──────► Container Registry│
                                │
                                ▼
                           Kubernetes
                                │
             ┌──────────────────┼─────────────────┐
             ▼                  ▼                 ▼
          Dev                  Staging           Prod
```

## API

### Auth Service

POST register
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me

### Product Service

GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id

### Order Service

POST /api/v1/orders
GET  /api/v1/orders/:id
GET  /api/v1/orders

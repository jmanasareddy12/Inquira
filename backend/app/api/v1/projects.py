from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse
from app.services.project_service import ProjectService
from app.repositories.project_repository import ProjectRepository

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ProjectService.create_project(
        db=db,
        owner_id=current_user.id,
        title=project.title,
        description=project.description
    )


@router.get("", response_model=list[ProjectResponse])
def get_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ProjectService.get_projects(
        db=db,
        owner_id=current_user.id
    )

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:
        project = ProjectService.get_project(
            db=db,
            project_id=project_id
        )

        if project.owner_id != current_user.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

        return project

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    
@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    project = ProjectRepository.get_by_id(
        db,
        project_id
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return ProjectService.delete_project(
        db=db,
        project_id=project_id
    )
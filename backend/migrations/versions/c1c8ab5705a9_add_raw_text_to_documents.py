"""add raw_text to documents

Revision ID: c1c8ab5705a9
Revises: f6ccf6431fa2
Create Date: 2026-07-10 00:34:10.724459
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "c1c8ab5705a9"
down_revision: Union[str, Sequence[str], None] = "f6ccf6431fa2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "documents",
        sa.Column("raw_text", sa.Text(), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("documents", "raw_text")
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import Progress, Lesson


async def next_lesson_for_user(db: AsyncSession, user_id: int) -> dict | None:
	# Very naive baseline: pick any lesson not completed; prefer beginner->advanced order
	result = await db.execute(select(Lesson).order_by(Lesson.level.asc()))
	lessons = result.scalars().all()

	prog = await db.execute(select(Progress).where(Progress.user_id == user_id))
	done_ids = {p.lesson_id for p in prog.scalars().all() if p.status == "completed"}

	for l in lessons:
		if l.id not in done_ids:
			return {"slug": l.slug, "title": l.title, "level": l.level}
	return None
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from pathlib import Path
import pandas as pd

app = FastAPI()

DATA_FILE = Path(__file__).parent / "data" / "spells.jsonl"

def load_dataframe() -> pd.DataFrame:
    df = pd.read_json(DATA_FILE, lines=True)
    # normalize column names once if needed
    df.columns = [c.lower() for c in df.columns]
    return df

DF = load_dataframe()


@app.get("/api/search")
def search(
    q: str = Query(min_length=1),
    sort: str | None = None,
    dir: str = "asc",
    limit: int = 100,
    offset: int = 0,
):
    ql = q.lower()

    # filter
    mask = DF["name"].str.lower().str.contains(ql, na=False)
    results = DF[mask]

    # sort (optional)
    if sort and sort in results.columns:
        ascending = dir != "desc"
        results = results.sort_values(by=sort, ascending=ascending)

    total = len(results)

    # paginate
    page = results.iloc[offset : offset + limit]

    return JSONResponse(
        content={
            "query": q,
            "count": total,
            "rows": page.to_dict(orient="records"),
        }
    )


@app.get("/api/reload")
def reload_data():
    global DF
    DF = load_dataframe()
    return {"status": "reloaded", "rows": len(DF)}

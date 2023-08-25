# # implimentation of 'Brains' part of "brains and brawn". going to make these endpoints secure here, and use the logic to pull the api-ninja exercises from the 3rd party
# import psycopg2

# from typing import List
# from pydantic import BaseModel

# import uvicorn
# from fastapi import FastAPI, status

# from fastapi.middleware.cors import CORSMiddleware

# class Book(BaseModel):
#     id: int = None,
#     volume_id: str
#     title: str
#     authors: str = None
#     thumbnail: str = None
#     state: int
#     rating: int = None

# class UpdateRatingRequestBody(BaseModel):
#     volume_id: str
#     new_rating: int

# app = FastAPI(debug=True)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class UpdateStateRequestBody(BaseModel):
#     volume_id: str
#     new_state: int

# #check status
# @app.get("/status")
# async def check_status():
#     return "Hello World!"

# #Get books endpoint: get all books in database with fetchall()
# @app.get("/books", response_model=List[Book], status_code=status.HTTP_200_OK)
# async def get_books():
#     # connect to our database here
#     conn = psycopg2.connect(
#         database="exampledb", user="docker", password="docker", host="0.0.0.0"
#     )
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM book ORDER BY id DESC")
#     rows = cur.fetchall()

#     formatted_books = []
#     for row in rows:
#         formatted_books.append(
#             Book(
#             id=row[0],
#             volume_id=row[1],
#             title=row[2],
#             authors=row[3],
#             thumbnail=row[4],
#             state=row[5],
#             rating=row[6],
#             )
#         )
#     cur.close()
#     conn.close()

#     return formatted_books
# #adding a new book to a library
# @app.post("/books", status_code=status.HTTP_201_CREATED)
# async def new_book(book: Book):
#     # return "New Book!"
#     conn = psycopg2.connect(
#         database="exampledb", user="docker", password="docker", host="0.0.0.0"
#     )
#     cur = conn.cursor()
#     #cur.execute does this in memory, conn.commit writes it to disk
#     cur.execute(f"INSERT INTO book (volume_id, title, authors, thumbnail, state) VALUES ('{book.volume_id}', '{book.title}', '{book.authors}', '{book.thumbnail}', '{book.state}')")
#     #won't add rating bc you don't rate the book when you get it. that will be a diff endpoint
#     cur.close()
#     conn.commit()
#     conn.close()
#     return

# @app.put("/books/update_rating", status_code=200)
# async def update_rating(update_rating_body: UpdateRatingRequestBody):
#     conn = psycopg2.connect(
#         database="exampledb", user="docker", password="docker", host="0.0.0.0"
#     )
#     cur = conn.cursor()
#     cur.execute(
#         f"UPDATE book SET rating={update_rating_body.new_rating} WHERE volume_id='{update_rating_body.volume_id}'"
#     )
#     cur.close()
#     conn.commit()
#     conn.close()
#     return

# @app.put("/books/update_book_state", status_code=200)
# async def update_state(update_state_request_body: UpdateStateRequestBody):
#     conn = psycopg2.connect(
#         database="exampledb", username="docker", password="docker", host="0.0.0.0"
#     )
#     cur = conn.cursor()
#     cur.execute(
#         f"UPDATE book SET state={update_state_request_body.new_state} WHERE volume_id='{update_state_request_body.volume_id}'"
#     )
#     cur.close()
#     conn.commit()
#     conn.close()
#     return

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8001)

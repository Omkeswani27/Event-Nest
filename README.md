# Event-Nest

A Django-based REST API application for managing events. This project allows users to create, retrieve, and manage events using a REST API with Django and the Django REST Framework.

## Features

- **Event List API**: Retrieve a list of all events.
- **Event Create API**: Add new events via API.
- **Event Detail API**: View, update, and delete specific events.
- **Event Model**: Stores event details like name, description, and date.
- **Serialization**: Converts data between Django objects and JSON.
- **Database**: Uses Django ORM for handling database operations.
- **REST Framework**: Utilizes Django REST Framework for API management.

## Prerequisites

To run this project locally, you need to have the following installed:

- **Python 3.12.x** or above
- **Django 5.1.x**
- **Django REST Framework**
- **Git** (for version control)
- **pip** (for managing Python packages)

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/bhagirath1312/Event-Nest-.git
    cd Event-Nest
    ```

2. **Set Up Virtual Environment** (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # For Windows: venv\Scripts\activate
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run Migrations**:
    ```bash
    python manage.py migrate
    ```

5. **Create a Superuser**:
    ```bash
    python manage.py createsuperuser
    ```

6. **Run the Development Server**:
    ```bash
    python manage.py runserver
    ```

7. **Access the API**:
    - You can access the API endpoints at `http://127.0.0.1:8000/api/events/`.

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/events/`         | List all events          |
| POST   | `/api/events/`         | Create a new event       |
| GET    | `/api/events/{id}/`    | Retrieve a specific event|
| PUT    | `/api/events/{id}/`    | Update an event          |
| DELETE | `/api/events/{id}/`    | Delete an event          |

## Running Tests

To run the tests for the project, use the following command:

```bash
python manage.py test
```
**Current Version**

Current release: v1.0.0

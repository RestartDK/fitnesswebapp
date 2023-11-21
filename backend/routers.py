from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

class MongoDBRouter:
    """
    A database router to route certain models to MongoDB.
    """

    def db_for_read(self, model, **hints):
        if model._meta.app_label == BASE_DIR/'api':  # Replace 'yourappname' with the actual app name
            return 'mongodb'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == BASE_DIR/'api':
            return 'mongodb'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == 'mongodb':
            return False  # Don't allow migrations for MongoDB
        return None

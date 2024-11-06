from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'csci400_random_string_as_secret_key'

# Configure the database URI for SQLAlchemy
username = 't5'  # Replace with actual username
password = 'SjBqiLwyZu0kMlfm'  # Replace with actual password
engine = sqlalchemy.create_engine(f"mariadb+mariadbconnector://{username}:{password}@34.125.69.91/f24_housing_db")

Base = declarative_base()

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = '/'  # Redirect to root route ("/") for login

# Define the User model
class User(Base, UserMixin):  # Inherit from UserMixin to work with Flask-Login
    __tablename__ = 'user'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True) 
    username = sqlalchemy.Column(sqlalchemy.String(length=150), unique=True)
    password = sqlalchemy.Column(sqlalchemy.String(length=170))
    firstname = sqlalchemy.Column(sqlalchemy.String(length=100))
    lastname = sqlalchemy.Column(sqlalchemy.String(length=100))
    active = sqlalchemy.Column(sqlalchemy.Boolean, default=True)

Base.metadata.create_all(engine)

# Create a session
Session = sqlalchemy.orm.sessionmaker()
Session.configure(bind=engine)
db_session = Session()

def addUser(userName, passWord, firstName, lastName):
    newUser = User(username=userName, password=passWord, firstname=firstName, lastname=lastName, active=True)
    db_session.add(newUser)
    db_session.commit()

# Flask-Login user loader
@login_manager.user_loader
def load_user(user_id):
    return db_session.query(User).get(int(user_id))

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = db_session.query(User).filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)  # Log in the user with Flask-Login
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password', 'error')
    return render_template('login.html')

@app.route('/create_account', methods=['GET', 'POST'])
def create_account():
    if request.method == 'POST':
        username = request.form['username']
        password = generate_password_hash(request.form['password'], method='scrypt')
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        addUser(username, password, firstname, lastname)
        flash('Account created successfully', 'success')
        return redirect(url_for('login'))
    return render_template('create_account.html')

@app.route('/home')
@login_required
def home():
    return render_template('home.html')

@app.route('/tenantlist')
@login_required
def tenantlist():
    users = db_session.query(User).all()
    ##print(users)
    return render_template('tenantlist.html', users=users)

@app.route('/propertylist')
@login_required
def propertylist():
    return render_template('propertylist.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()  # Log out the user
    flash('You have been logged out', 'success')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)

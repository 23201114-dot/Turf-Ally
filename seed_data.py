import os
import django
from django.utils import timezone
from datetime import timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turfally.settings')
django.setup()

from django.contrib.auth.models import User
from accounts.models import AthleteProfile
from turfs.models import Venue, Turf
from bookings.models import Booking

def seed():
    print("Starting data seeding...")

    # 1. Create Users
    users_data = [
        {'username': 'shehab', 'email': 'shehab@example.com', 'password': 'password123', 'first_name': 'Shehab', 'last_name': 'Boss'},
        {'username': 'player1', 'email': 'player1@example.com', 'password': 'password123', 'first_name': 'John', 'last_name': 'Doe'},
        {'username': 'player2', 'email': 'player2@example.com', 'password': 'password123', 'first_name': 'Jane', 'last_name': 'Smith'},
    ]

    created_users = []
    for u_data in users_data:
        user, created = User.objects.get_or_create(
            username=u_data['username'],
            defaults={'email': u_data['email'], 'first_name': u_data['first_name'], 'last_name': u_data['last_name']}
        )
        if created:
            user.set_password(u_data['password'])
            user.save()
            print(f"Created user: {user.username}")
        else:
            print(f"User {user.username} already exists")
        created_users.append(user)

    # 2. Create Athlete Profiles
    for user in created_users:
        profile, created = AthleteProfile.objects.get_or_create(
            user=user,
            defaults={'matches': 10, 'win_rate': 75.5, 'mvp': 2, 'member_type': 'Elite Member'}
        )
        if created:
            print(f"Created profile for: {user.username}")

    # 3. Create Venues
    venues_data = [
        {'name': 'Downtown Arena', 'location': 'Central Park, NY'},
        {'name': 'Riverside Sports', 'location': 'Riverside Dr, NY'},
        {'name': 'Eastside Turf', 'location': 'East 14th St, NY'},
    ]

    created_venues = []
    for v_data in venues_data:
        venue, created = Venue.objects.get_or_create(
            name=v_data['name'],
            defaults={'location': v_data['location']}
        )
        if created:
            print(f"Created venue: {venue.name}")
        created_venues.append(venue)

    # 4. Create Turfs
    turfs_data = [
        {'name': 'Main Football Pitch', 'sport': 'Football', 'hourly_rate': 50.00, 'venue': created_venues[0]},
        {'name': 'Tennis Court A', 'sport': 'Tennis', 'hourly_rate': 30.00, 'venue': created_venues[0]},
        {'name': 'Basketball Court', 'sport': 'Basketball', 'hourly_rate': 40.00, 'venue': created_venues[1]},
        {'name': 'Cricket Ground', 'sport': 'Cricket', 'hourly_rate': 60.00, 'venue': created_venues[2]},
    ]

    created_turfs = []
    for t_data in turfs_data:
        turf, created = Turf.objects.get_or_create(
            name=t_data['name'],
            defaults={
                'sport': t_data['sport'],
                'hourly_rate': t_data['hourly_rate'],
                'venue': t_data['venue']
            }
        )
        if created:
            print(f"Created turf: {turf.name}")
        created_turfs.append(turf)

    # 5. Create Bookings
    if created_users and created_turfs:
        booking_data = [
            {
                'user': created_users[0],
                'turf': created_turfs[0],
                'start_time': timezone.now() + timedelta(days=1),
                'end_time': timezone.now() + timedelta(days=1, hours=2),
                'total_amount': created_turfs[0].hourly_rate * 2,
                'status': 'confirmed'
            },
            {
                'user': created_users[1],
                'turf': created_turfs[2],
                'start_time': timezone.now() + timedelta(days=2),
                'end_time': timezone.now() + timedelta(days=2, hours=1),
                'total_amount': created_turfs[2].hourly_rate,
                'status': 'pending'
            }
        ]

        for b_data in booking_data:
            booking, created = Booking.objects.get_or_create(
                user=b_data['user'],
                turf=b_data['turf'],
                start_time=b_data['start_time'],
                defaults={
                    'end_time': b_data['end_time'],
                    'total_amount': b_data['total_amount'],
                    'status': b_data['status']
                }
            )
            if created:
                print(f"Created booking for {booking.user.username} at {booking.turf.name}")

    print("Seeding completed successfully!")

if __name__ == '__main__':
    seed()

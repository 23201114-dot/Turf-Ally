from django.db import models


# Model representing a Venue
# A venue is the physical location where turfs are available
class Venue(models.Model):

    # Name of the venue
    name = models.CharField(max_length=255)

    # Location/address of the venue
    location = models.CharField(max_length=255)

    # String representation of the model
    # This will display the venue name in Django admin and shell
    def __str__(self):
        return self.name


# Model representing a Turf
# A turf belongs to a venue and contains sports-related information
class Turf(models.Model):

    # Name of the turf
    name = models.CharField(max_length=255)

    # Type of sport played on the turf
    # Example: Football, Cricket, Tennis
    sport = models.CharField(max_length=100)

    # Hourly booking rate for the turf
    # max_digits=10 allows total 10 digits
    # decimal_places=2 keeps 2 digits after decimal point
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)

    # ForeignKey relationship with Venue model
    # related_name='turfs' allows reverse access from Venue object
    # on_delete=models.CASCADE deletes related turfs if venue is deleted
    # null=True allows database NULL values
    # blank=True makes the field optional in forms
    venue = models.ForeignKey(
        Venue,
        related_name='turfs',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    # String representation of the Turf model
    # Displays turf name in admin panel and shell
    def __str__(self):
        return self.name
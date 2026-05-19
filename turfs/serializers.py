# Converts Venue model data into JSON format and vice versa
class VenueSerializer(serializers.ModelSerializer):

    class Meta:
        # Specify the model to serialize
        model = Venue

        # Include all fields from the Venue model
        fields = '__all__'


# Serializer for Turf model
class TurfSerializer(serializers.ModelSerializer):

    # Nested serializer to display full venue details in read operations
    # read_only=True means this field cannot be modified directly
    venue = VenueSerializer(read_only=True)

    # Used to assign a venue by its primary key (ID)
    # write_only=True means it will only be used when creating/updating data
    # source='venue' connects this field to the venue ForeignKey field
    # required=False means the field is optional
    venue_id = serializers.PrimaryKeyRelatedField(
        queryset=Venue.objects.all(), source='venue', write_only=True, required=False
    )

    class Meta:
        # Specify the model to serialize
        model = Turf

        # Include all fields from the Turf model
        fields = '__all__'
        # New line to code
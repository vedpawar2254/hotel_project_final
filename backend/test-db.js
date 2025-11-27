const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Booking = require('./models/Booking');

const testSetup = async () => {
    await connectDB();

    try {
        // Create a sample booking
        const newBooking = new Booking({
            bookingId: 'BK_TEST_001',
            roomNumber: 101,
            customerName: 'John Doe',
            contactEmail: 'john.doe@example.com',
            contactPhone: '1234567890',
            paymentStatus: 'paid',
            paymentMethod: 'card',
            bookingStatus: 'reserved',
            guests: 2,
            roomType: 'double',
            specialRequests: 'Late check-in',
            checkIn: {
                checkInDate: new Date('2023-12-01'),
                checkInMonth: 12,
                checkInDay: 1,
                checkInYear: 2023
            },
            checkOut: {
                checkOutDate: new Date('2023-12-05'),
                checkOutMonth: 12,
                checkOutDay: 5,
                checkOutYear: 2023
            },
            totalAmount: 5000,
            currency: 'INR',
            airportPickupIncluded: true
        });

        const savedBooking = await newBooking.save();
        console.log('Booking saved successfully:', savedBooking);

        // Verify nights calculation
        if (savedBooking.nights === 4) {
            console.log('Nights calculation verified: 4 nights');
        } else {
            console.error(`Nights calculation failed: expected 4, got ${savedBooking.nights}`);
        }

        // Clean up
        await Booking.deleteOne({ bookingId: 'BK_TEST_001' });
        console.log('Test booking cleaned up');

    } catch (error) {
        console.error('Error testing setup:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

testSetup();

# GiziTrack
![GiziTrack Logo](https://cdn.discordapp.com/attachments/921758712597737512/1347614880206688340/image_2.png?ex=67cc77a8&is=67cb2628&hm=92077ab03329c2aad992030e67ca25c30ad1c0a9579965de25e624b34d125c28&)
## About
GiziTrack is a comprehensive full-stack application combining a user-friendly client-side interface with a robust back-end system. Designed to enhance the tracking of the "Makan Siang Gratis" program by the Indonesian government, it features streamlined navigation, real-time notifications, and an interactive dashboard for efficiently monitoring meal delivery to students.

## Features
- **User Roles**: Differentiated access for three user roles:
  - **Kepala Sekolah (School Head)**: Manage meal distribution, oversee school information, and ensure adherence to health standards.
  - **Pemerintah (Government)**: Monitor program effectiveness, manage funding, and ensure proper allocation of resources across participating schools.
  - **SPPG (Food Handler)**: Administer food inventory, log meal preparation activities, and report on meal distribution.

- **Meal Tracking**: Monitor daily meal distributions and student engagement.
- **Interactive Dashboard**: Visualize meal delivery status and student feedback in real-time for informed decision-making.
- **Real-time Notifications**: Stay updated on meal schedules and important announcements through instant notifications.
- **Feedback System**: Facilitate feedback from students to enhance meal satisfaction and quality.
- **Reporting**: Generate performance reports for school heads and food handlers, leveraging data for actionable insights.

## Technologies Used
- **Front-End**: React.js, Vite, Tailwind CSS
- **Back-End**: Laravel, TypeScript, JavaScript
- **Deployment**: Docker, Nginx for load balancing

## Installation
To get a local copy of GiziTrack, follow these simple steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Cedrugs/GiziTrack.git
   ```
2. **Set up your environment**: 
   Create a `.env` file in the root directory and configure your environment variables as needed.
3. **Run the application with Docker**:
   ```bash
   docker run -p gizitrack/gizitrack:2.0.15 5173:5173 -p 8000:8000
   ```
4. **All set!** You can now access the application.

## Contributing
Contributions are welcome! If you'd like to contribute to GiziTrack, please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push your branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please ensure your contributions adhere to our coding standards and include appropriate documentation.

## License
This project is licensed under the MIT License - see the [LICENSE](https://mit-license.org/) file for details.

## Contact
For inquiries, suggestions, or feedback, please reach out to us at [youremail@example.com](mailto:ceds.sam@gmail.com).

Thank you for your interest in GiziTrack! We hope it enhances the experience of the "Makan Siang Gratis" program for schools across Indonesia.
import React from 'react'

function About() {
  return (
    <div className="bg-green-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          About Our Organization
        </h1>

        <div className="bg-white p-8 mx-12 rounded-lg shadow-lg mb-12 flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to empower students to achieve their dreams through
              our scholarship programs. We believe in providing the necessary
              support and resources to help students excel in their studies and
              careers.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://www.pngkey.com/png/detail/334-3340877_mission-png-transparent-mission-mission-icons.png"
              alt="Our Mission"
              className="w-full h-64 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="bg-white p-8 mx-12 rounded-lg shadow-lg mb-12 flex flex-wrap items-center">
          <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchTE3V57g5-V7qy2XwK8EcKy_hpryvNZLSg&s"
              alt="Our Vision"
              className="w-full h-64 object-contain rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              Our vision is to create a world where every student has the
              opportunity to pursue their educational goals without financial
              barriers. We aim to foster a community of learners who are
              supported and inspired to reach their full potential.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 mx-12 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            Meet Our Committee Members
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="team-member bg-white shadow-lg rounded-lg overflow-hidden w-80">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwWf4v8y-sHDj4CzyJ07YQa6DlV4T1QyBvA&s"
                alt="Team Member 1"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Member 1</h3>
                <p className="text-gray-700">Founder & CEO</p>
              </div>
            </div>
            <div className="team-member bg-white shadow-lg rounded-lg overflow-hidden w-80">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwWf4v8y-sHDj4CzyJ07YQa6DlV4T1QyBvA&s"
                alt="Team Member 2"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Member 2</h3>
                <p className="text-gray-700">Program Director</p>
              </div>
            </div>
            <div className="team-member bg-white shadow-lg rounded-lg overflow-hidden w-80">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwWf4v8y-sHDj4CzyJ07YQa6DlV4T1QyBvA&s"
                alt="Team Member 3"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Member 3</h3>
                <p className="text-gray-700">Community Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 mx-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            Our organization was founded with the goal of making education
            accessible to all. Over the years, we have supported countless
            students through our scholarship programs, helping them achieve
            their academic and career goals. We are committed to continuing this
            mission and expanding our reach to support even more students in the
            future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
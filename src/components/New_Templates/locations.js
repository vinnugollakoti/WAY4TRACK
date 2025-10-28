const locations = [
  {
    title: "Head Quarters Visakhapatnam",
    address:
      "21-27 Viman Nagar airport road near INS Dega Visakhapatnam, Andhra Pradesh. 530009",
    email: "support@way4track.com",
    phone1: "+0891 270 22 44",
    phone2: "+91 9110 72 9757",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3800.1880463334555!2d83.2266479!3d17.7357766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3968739c9d2643%3A0xbd513f2b2c5e9305!2sSHARON%20TELEMATICS%20PVT%20LTD%20%7C%20WAY4TRACK%20FUEL%20MONITORING%20SYSTEM%20(GPS%20TRACKER)%20VISAKHAPATNAM!5e0!3m2!1sen!2sin!4v1761644289578!5m2!1sen!2sin",
  },
  {
    title: "Corporate Office Hyderabad",
    address:
      "Flat No.305, 3rd floor, No.17-1-382/1, above Bhavani Nilayam, Nagarjuna Colony, Champapet, Telangana 500079",
    email: "support@way4track.com",
    phone1: "+0891 270 22 44",
    phone2: "+91 9110 729 757",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.414834233839!2d78.52477437569825!3d17.44187109737626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a3c9d%3A0x8c2b7f3b6e3e4b1a!2sFlat%20No.305%2C%203rd%20floor%2C%20No.17-1-382%2F1%2C%20above%20Bhavani%20Nilayam%2C%20Nagarjuna%20Colony%2C%20Champapet%2C%20Telangana%20500079!5e0!3m2!1sen!2sin!4v1761644289578!5m2!1sen!2sin",
  },
  {
    title: "Sub Branch Vijayawada",
    address:
      "Door no: 30-20-7, Beside Ravindra, Timber depot and sawmill Nehru street, Eluru Rd, Seetharampuram, Vijayawada, AP - 520002",
    email: "support@way4track.com",
    phone1: "+0891 270 22 44",
    phone2: "+91 9110 729 757",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.234567890123!2d80.64805277569825!3d16.50617459737626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff123456789%3A0xbd513f2b2c5e9305!2sDoor%20no%3A%2030-20-7%2C%20Beside%20Ravindra%2C%20Timber%20depot%20and%20sawmill%20Nehru%20street%2C%20Eluru%20Rd%2C%20Seetharampuram%2C%20Vijayawada%2C%20AP%20-%20520002!5e0!3m2!1sen!2sin!4v1761644289578!5m2!1sen!2sin",
  },
  {
    title: "Sub Branch Kakinada",
    address:
      "3rd floor, H Square Building, 2-226/2, opp. APSAP, Anjaneya Nagar, APSP, Kakinada, AP - 533005",
    email: "support@way4track.com",
    phone1: "+0891 270 22 44",
    phone2: "+91 9110 729 757",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.456789012345!2d82.23823457569825!3d16.96037459737626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3812345678901%3A0xbd513f2b2c5e9305!2s3rd%20floor%2C%20H%20Square%20Building%2C%202-226%2F2%2C%20opp.%20APSAP%2C%20Anjaneya%20Nagar%2C%20APSP%2C%20Kakinada%2C%20AP%20-%20533005!5e0!3m2!1sen!2sin!4v1761644289578!5m2!1sen!2sin",
  },
  {
    title: "Sub Branch Tirupati",
    address:
      "16-42/1, Ground Floor, Dhanalakshmi Nagar, R.C.Road, near Kalisham Building, Avilala, Tirupati, Andhra Pradesh 517501",
    email: "support@way4track.com",
    phone1: "+0891 270 22 44",
    phone2: "+91 9550564548",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.123456789012!2d79.41947507569825!3d13.62875439737626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b123456789%3A0xbd513f2b2c5e9305!2s16-42%2F1%2C%20Ground%20Floor%2C%20Dhanalakshmi%20Nagar%2C%20R.C.Road%2C%20near%20Kalisham%20Building%2C%20Avilala%2C%20Tirupati%2C%20Andhra%20Pradesh%20517501!5e0!3m2!1sen!2sin!4v1761644289578!5m2!1sen!2sin",
  },
  {
    title: "Sub Branch Bangalore",
    address:
      "Ground Floor, Door No.30/1 Hunachur, BK Halli Post, Bangalore North, Bandikodigehalli, Bangalore, karnataka - 562149",
    email: "support@way4track.com",
    phone1: "+0891 270 22 44",
    phone2: "+91 7032213434",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789012!2d77.59457507569825!3d12.97159879737626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae12345678901%3A0xbd513f2b2c5e9305!2sGround%20Floor%2C%20Door%20No.30%2F1%20Hunachur%2C%20BK%20Halli%20Post%2C%20Bangalore%20North%2C%20Bandikodigehalli%2C%20Bangalore%2C%20karnataka%20-%20562149!5e0!3m2!1sen!2sin!4v1761644289578!5m2!1sen!2sin",
  }
];

export default locations;
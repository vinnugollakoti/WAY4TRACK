// ProductsPage.js

import React, { useState, useEffect, useContext } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import ProductPopupPage from "../ProductPopupPage/ProductPopupPage";

function ProductsPage() {
  const { addToCart, updateQuantity, cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const statesWithCities = {
    "Andaman and Nicobar Islands": ["Port Blair"],
    Haryana: [
      "Faridabad",
      "Gurgaon",
      "Hisar",
      "Rohtak",
      "Panipat",
      "Karnal",
      "Sonipat",
      "Yamunanagar",
      "Panchkula",
      "Bhiwani",
      "Bahadurgarh",
      "Jind",
      "Sirsa",
      "Thanesar",
      "Kaithal",
      "Palwal",
      "Rewari",
      "Hansi",
      "Narnaul",
      "Fatehabad",
      "Gohana",
      "Tohana",
      "Narwana",
      "Mandi Dabwali",
      "Charkhi Dadri",
      "Shahbad",
      "Pehowa",
      "Samalkha",
      "Pinjore",
      "Ladwa",
      "Sohna",
      "Safidon",
      "Taraori",
      "Mahendragarh",
      "Ratia",
      "Rania",
      "Sarsod",
    ],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Tirunelveli",
      "Tiruppur",
      "Ranipet",
      "Nagercoil",
      "Thanjavur",
      "Vellore",
      "Kancheepuram",
      "Erode",
      "Tiruvannamalai",
      "Pollachi",
      "Rajapalayam",
      "Sivakasi",
      "Pudukkottai",
      "Neyveli (TS)",
      "Nagapattinam",
      "Viluppuram",
      "Tiruchengode",
      "Vaniyambadi",
      "Theni Allinagaram",
      "Udhagamandalam",
      "Aruppukkottai",
      "Paramakudi",
      "Arakkonam",
      "Virudhachalam",
      "Srivilliputhur",
      "Tindivanam",
      "Virudhunagar",
      "Karur",
      "Valparai",
      "Sankarankovil",
      "Tenkasi",
      "Palani",
      "Pattukkottai",
      "Tirupathur",
      "Ramanathapuram",
      "Udumalaipettai",
      "Gobichettipalayam",
      "Thiruvarur",
      "Thiruvallur",
      "Panruti",
      "Namakkal",
      "Thirumangalam",
      "Vikramasingapuram",
      "Nellikuppam",
      "Rasipuram",
      "Tiruttani",
      "Nandivaram-Guduvancheri",
      "Periyakulam",
      "Pernampattu",
      "Vellakoil",
      "Sivaganga",
      "Vadalur",
      "Rameshwaram",
      "Tiruvethipuram",
      "Perambalur",
      "Usilampatti",
      "Vedaranyam",
      "Sathyamangalam",
      "Puliyankudi",
      "Nanjikottai",
      "Thuraiyur",
      "Sirkali",
      "Tiruchendur",
      "Periyasemur",
      "Sattur",
      "Vandavasi",
      "Tharamangalam",
      "Tirukkoyilur",
      "Oddanchatram",
      "Palladam",
      "Vadakkuvalliyur",
      "Tirukalukundram",
      "Uthamapalayam",
      "Surandai",
      "Sankari",
      "Shenkottai",
      "Vadipatti",
      "Sholingur",
      "Tirupathur",
      "Manachanallur",
      "Viswanatham",
      "Polur",
      "Panagudi",
      "Uthiramerur",
      "Thiruthuraipoondi",
      "Pallapatti",
      "Ponneri",
      "Lalgudi",
      "Natham",
      "Unnamalaikadai",
      "P.N.Patti",
      "Tharangambadi",
      "Tittakudi",
      "Pacode",
      "O' Valley",
      "Suriyampalayam",
      "Sholavandan",
      "Thammampatti",
      "Namagiripettai",
      "Peravurani",
      "Parangipettai",
      "Pudupattinam",
      "Pallikonda",
      "Sivagiri",
      "Punjaipugalur",
      "Padmanabhapuram",
      "Thirupuvanam",
    ],
    "Madhya Pradesh": [
      "Indore",
      "Bhopal",
      "Jabalpur",
      "Gwalior",
      "Ujjain",
      "Sagar",
      "Ratlam",
      "Satna",
      "Murwara (Katni)",
      "Morena",
      "Singrauli",
      "Rewa",
      "Vidisha",
      "Ganjbasoda",
      "Shivpuri",
      "Mandsaur",
      "Neemuch",
      "Nagda",
      "Itarsi",
      "Sarni",
      "Sehore",
      "Mhow Cantonment",
      "Seoni",
      "Balaghat",
      "Ashok Nagar",
      "Tikamgarh",
      "Shahdol",
      "Pithampur",
      "Alirajpur",
      "Mandla",
      "Sheopur",
      "Shajapur",
      "Panna",
      "Raghogarh-Vijaypur",
      "Sendhwa",
      "Sidhi",
      "Pipariya",
      "Shujalpur",
      "Sironj",
      "Pandhurna",
      "Nowgong",
      "Mandideep",
      "Sihora",
      "Raisen",
      "Lahar",
      "Maihar",
      "Sanawad",
      "Sabalgarh",
      "Umaria",
      "Porsa",
      "Narsinghgarh",
      "Malaj Khand",
      "Sarangpur",
      "Mundi",
      "Nepanagar",
      "Pasan",
      "Mahidpur",
      "Seoni-Malwa",
      "Rehli",
      "Manawar",
      "Rahatgarh",
      "Panagar",
      "Wara Seoni",
      "Tarana",
      "Sausar",
      "Rajgarh",
      "Niwari",
      "Mauganj",
      "Manasa",
      "Nainpur",
      "Prithvipur",
      "Sohagpur",
      "Nowrozabad (Khodargama)",
      "Shamgarh",
      "Maharajpur",
      "Multai",
      "Pali",
      "Pachore",
      "Rau",
      "Mhowgaon",
      "Vijaypur",
      "Narsinghgarh",
    ],
    Jharkhand: [
      "Dhanbad",
      "Ranchi",
      "Jamshedpur",
      "Bokaro Steel City",
      "Deoghar",
      "Phusro",
      "Adityapur",
      "Hazaribag",
      "Giridih",
      "Ramgarh",
      "Jhumri Tilaiya",
      "Saunda",
      "Sahibganj",
      "Medininagar (Daltonganj)",
      "Chaibasa",
      "Chatra",
      "Gumia",
      "Dumka",
      "Madhupur",
      "Chirkunda",
      "Pakaur",
      "Simdega",
      "Musabani",
      "Mihijam",
      "Patratu",
      "Lohardaga",
      "Tenu dam-cum-Kathhara",
    ],
    Mizoram: ["Aizawl", "Lunglei", "Saiha"],
    Nagaland: [
      "Dimapur",
      "Kohima",
      "Zunheboto",
      "Tuensang",
      "Wokha",
      "Mokokchung",
    ],
    "Himachal Pradesh": [
      "Shimla",
      "Mandi",
      "Solan",
      "Nahan",
      "Sundarnagar",
      "Palampur",
      "Kullu",
    ],
    Tripura: [
      "Agartala",
      "Udaipur",
      "Dharmanagar",
      "Pratapgarh",
      "Kailasahar",
      "Belonia",
      "Khowai",
    ],
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Kurnool",
      "Rajahmundry",
      "Kakinada",
      "Tirupati",
      "Anantapur",
      "Kadapa",
      "Vizianagaram",
      "Eluru",
      "Ongole",
      "Nandyal",
      "Machilipatnam",
      "Adoni",
      "Tenali",
      "Chittoor",
      "Hindupur",
      "Proddatur",
      "Bhimavaram",
      "Madanapalle",
      "Guntakal",
      "Dharmavaram",
      "Gudivada",
      "Srikakulam",
      "Narasaraopet",
      "Rajampet",
      "Tadpatri",
      "Tadepalligudem",
      "Chilakaluripet",
      "Yemmiganur",
      "Kadiri",
      "Chirala",
      "Anakapalle",
      "Kavali",
      "Palacole",
      "Sullurpeta",
      "Tanuku",
      "Rayachoti",
      "Srikalahasti",
      "Bapatla",
      "Naidupet",
      "Nagari",
      "Gudur",
      "Vinukonda",
      "Narasapuram",
      "Nuzvid",
      "Markapur",
      "Ponnur",
      "Kandukur",
      "Bobbili",
      "Rayadurg",
      "Samalkot",
      "Jaggaiahpet",
      "Tuni",
      "Amalapuram",
      "Bheemunipatnam",
      "Venkatagiri",
      "Sattenapalle",
      "Pithapuram",
      "Palasa Kasibugga",
      "Parvathipuram",
      "Macherla",
      "Gooty",
      "Salur",
      "Mandapeta",
      "Jammalamadugu",
      "Peddapuram",
      "Punganur",
      "Nidadavole",
      "Repalle",
      "Ramachandrapuram",
      "Kovvur",
      "Tiruvuru",
      "Uravakonda",
      "Narsipatnam",
      "Yerraguntla",
      "Pedana",
      "Puttur",
      "Renigunta",
      "Rajam",
      "Srisailam Project (Right Flank Colony) Township",
    ],
    Punjab: [
      "Ludhiana",
      "Patiala",
      "Amritsar",
      "Jalandhar",
      "Bathinda",
      "Pathankot",
      "Hoshiarpur",
      "Batala",
      "Moga",
      "Malerkotla",
      "Khanna",
      "Mohali",
      "Barnala",
      "Firozpur",
      "Phagwara",
      "Kapurthala",
      "Zirakpur",
      "Kot Kapura",
      "Faridkot",
      "Muktsar",
      "Rajpura",
      "Sangrur",
      "Fazilka",
      "Gurdaspur",
      "Kharar",
      "Gobindgarh",
      "Mansa",
      "Malout",
      "Nabha",
      "Tarn Taran",
      "Jagraon",
      "Sunam",
      "Dhuri",
      "Firozpur Cantt.",
      "Sirhind Fatehgarh Sahib",
      "Rupnagar",
      "Jalandhar Cantt.",
      "Samana",
      "Nawanshahr",
      "Rampura Phul",
      "Nangal",
      "Nakodar",
      "Zira",
      "Patti",
      "Raikot",
      "Longowal",
      "Urmar Tanda",
      "Morinda, India",
      "Phillaur",
      "Pattran",
      "Qadian",
      "Sujanpur",
      "Mukerian",
      "Talwara",
    ],
    Chandigarh: ["Chandigarh"],
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Bikaner",
      "Udaipur",
      "Ajmer",
      "Bhilwara",
      "Alwar",
      "Bharatpur",
      "Pali",
      "Barmer",
      "Sikar",
      "Tonk",
      "Sadulpur",
      "Sawai Madhopur",
      "Nagaur",
      "Makrana",
      "Sujangarh",
      "Sardarshahar",
      "Ladnu",
      "Ratangarh",
      "Nokha",
      "Nimbahera",
      "Suratgarh",
      "Rajsamand",
      "Lachhmangarh",
      "Rajgarh (Churu)",
      "Nasirabad",
      "Nohar",
      "Phalodi",
      "Nathdwara",
      "Pilani",
      "Merta City",
      "Sojat",
      "Neem-Ka-Thana",
      "Sirohi",
      "Pratapgarh",
      "Rawatbhata",
      "Sangaria",
      "Lalsot",
      "Pilibanga",
      "Pipar City",
      "Taranagar",
      "Vijainagar, Ajmer",
      "Sumerpur",
      "Sagwara",
      "Ramganj Mandi",
      "Lakheri",
      "Udaipurwati",
      "Losal",
      "Sri Madhopur",
      "Ramngarh",
      "Rawatsar",
      "Rajakhera",
      "Shahpura",
      "Shahpura",
      "Raisinghnagar",
      "Malpura",
      "Nadbai",
      "Sanchore",
      "Nagar",
      "Rajgarh (Alwar)",
      "Sheoganj",
      "Sadri",
      "Todaraisingh",
      "Todabhim",
      "Reengus",
      "Rajaldesar",
      "Sadulshahar",
      "Sambhar",
      "Prantij",
      "Mount Abu",
      "Mangrol",
      "Phulera",
      "Mandawa",
      "Pindwara",
      "Mandalgarh",
      "Takhatgarh",
    ],
    Assam: [
      "Guwahati",
      "Silchar",
      "Dibrugarh",
      "Nagaon",
      "Tinsukia",
      "Jorhat",
      "Bongaigaon City",
      "Dhubri",
      "Diphu",
      "North Lakhimpur",
      "Tezpur",
      "Karimganj",
      "Sibsagar",
      "Goalpara",
      "Barpeta",
      "Lanka",
      "Lumding",
      "Mankachar",
      "Nalbari",
      "Rangia",
      "Margherita",
      "Mangaldoi",
      "Silapathar",
      "Mariani",
      "Marigaon",
    ],
    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Raurkela",
      "Brahmapur",
      "Sambalpur",
      "Puri",
      "Baleshwar Town",
      "Baripada Town",
      "Bhadrak",
      "Balangir",
      "Jharsuguda",
      "Bargarh",
      "Paradip",
      "Bhawanipatna",
      "Dhenkanal",
      "Barbil",
      "Kendujhar",
      "Sunabeda",
      "Rayagada",
      "Jatani",
      "Byasanagar",
      "Kendrapara",
      "Rajagangapur",
      "Parlakhemundi",
      "Talcher",
      "Sundargarh",
      "Phulabani",
      "Pattamundai",
      "Titlagarh",
      "Nabarangapur",
      "Soro",
      "Malkangiri",
      "Rairangpur",
      "Tarbha",
    ],
    Chhattisgarh: [
      "Raipur",
      "Bhilai Nagar",
      "Korba",
      "Bilaspur",
      "Durg",
      "Rajnandgaon",
      "Jagdalpur",
      "Raigarh",
      "Ambikapur",
      "Mahasamund",
      "Dhamtari",
      "Chirmiri",
      "Bhatapara",
      "Dalli-Rajhara",
      "Naila Janjgir",
      "Tilda Newra",
      "Mungeli",
      "Manendragarh",
      "Sakti",
    ],
    "Jammu and Kashmir": [
      "Srinagar",
      "Jammu",
      "Baramula",
      "Anantnag",
      "Sopore",
      "KathUrban Agglomeration",
      "Rajauri",
      "Punch",
      "Udhampur",
    ],
    Karnataka: [
      "Bengaluru",
      "Hubli-Dharwad",
      "Belagavi",
      "Mangaluru",
      "Davanagere",
      "Ballari",
      "Mysore",
      "Tumkur",
      "Shivamogga",
      "Raayachuru",
      "Robertson Pet",
      "Kolar",
      "Mandya",
      "Udupi",
      "Chikkamagaluru",
      "Karwar",
      "Ranebennuru",
      "Ranibennur",
      "Ramanagaram",
      "Gokak",
      "Yadgir",
      "Rabkavi Banhatti",
      "Shahabad",
      "Sirsi",
      "Sindhnur",
      "Tiptur",
      "Arsikere",
      "Nanjangud",
      "Sagara",
      "Sira",
      "Puttur",
      "Athni",
      "Mulbagal",
      "Surapura",
      "Siruguppa",
      "Mudhol",
      "Sidlaghatta",
      "Shahpur",
      "Saundatti-Yellamma",
      "Wadi",
      "Manvi",
      "Nelamangala",
      "Lakshmeshwar",
      "Ramdurg",
      "Nargund",
      "Tarikere",
      "Malavalli",
      "Savanur",
      "Lingsugur",
      "Vijayapura",
      "Sankeshwara",
      "Madikeri",
      "Talikota",
      "Sedam",
      "Shikaripur",
      "Mahalingapura",
      "Mudalagi",
      "Muddebihal",
      "Pavagada",
      "Malur",
      "Sindhagi",
      "Sanduru",
      "Afzalpur",
      "Maddur",
      "Madhugiri",
      "Tekkalakote",
      "Terdal",
      "Mudabidri",
      "Magadi",
      "Navalgund",
      "Shiggaon",
      "Shrirangapattana",
      "Sindagi",
      "Sakaleshapura",
      "Srinivaspur",
      "Ron",
      "Mundargi",
      "Sadalagi",
      "Piriyapatna",
      "Adyar",
    ],
    Manipur: ["Imphal", "Thoubal", "Lilong", "Mayang Imphal"],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Kollam",
      "Thrissur",
      "Palakkad",
      "Alappuzha",
      "Malappuram",
      "Ponnani",
      "Vatakara",
      "Kanhangad",
      "Taliparamba",
      "Koyilandy",
      "Neyyattinkara",
      "Kayamkulam",
      "Nedumangad",
      "Kannur",
      "Tirur",
      "Kottayam",
      "Kasaragod",
      "Kunnamkulam",
      "Ottappalam",
      "Thiruvalla",
      "Thodupuzha",
      "Chalakudy",
      "Changanassery",
      "Punalur",
      "Nilambur",
      "Cherthala",
      "Perinthalmanna",
      "Mattannur",
      "Shoranur",
      "Varkala",
      "Paravoor",
      "Pathanamthitta",
      "Peringathur",
      "Attingal",
      "Kodungallur",
      "Pappinisseri",
      "Chittur-Thathamangalam",
      "Muvattupuzha",
      "Adoor",
      "Mavelikkara",
      "Mavoor",
      "Perumbavoor",
      "Vaikom",
      "Palai",
      "Panniyannur",
      "Guruvayoor",
      "Puthuppally",
      "Panamattom",
    ],
    Delhi: ["Delhi", "New Delhi"],
    "Dadra and Nagar Haveli": ["Silvassa"],
    Puducherry: ["Pondicherry", "Karaikal", "Yanam", "Mahe"],
    Uttarakhand: [
      "Dehradun",
      "Hardwar",
      "Haldwani-cum-Kathgodam",
      "Srinagar",
      "Kashipur",
      "Roorkee",
      "Rudrapur",
      "Rishikesh",
      "Ramnagar",
      "Pithoragarh",
      "Manglaur",
      "Nainital",
      "Mussoorie",
      "Tehri",
      "Pauri",
      "Nagla",
      "Sitarganj",
      "Bageshwar",
    ],
    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Firozabad",
      "Agra",
      "Meerut",
      "Varanasi",
      "Allahabad",
      "Amroha",
      "Moradabad",
      "Aligarh",
      "Saharanpur",
      "Noida",
      "Loni",
      "Jhansi",
      "Shahjahanpur",
      "Rampur",
      "Modinagar",
      "Hapur",
      "Etawah",
      "Sambhal",
      "Orai",
      "Bahraich",
      "Unnao",
      "Rae Bareli",
      "Lakhimpur",
      "Sitapur",
      "Lalitpur",
      "Pilibhit",
      "Chandausi",
      "Hardoi ",
      "Azamgarh",
      "Khair",
      "Sultanpur",
      "Tanda",
      "Nagina",
      "Shamli",
      "Najibabad",
      "Shikohabad",
      "Sikandrabad",
      "Shahabad, Hardoi",
      "Pilkhuwa",
      "Renukoot",
      "Vrindavan",
      "Ujhani",
      "Laharpur",
      "Tilhar",
      "Sahaswan",
      "Rath",
      "Sherkot",
      "Kalpi",
      "Tundla",
      "Sandila",
      "Nanpara",
      "Sardhana",
      "Nehtaur",
      "Seohara",
      "Padrauna",
      "Mathura",
      "Thakurdwara",
      "Nawabganj",
      "Siana",
      "Noorpur",
      "Sikandra Rao",
      "Puranpur",
      "Rudauli",
      "Thana Bhawan",
      "Palia Kalan",
      "Zaidpur",
      "Nautanwa",
      "Zamania",
      "Shikarpur, Bulandshahr",
      "Naugawan Sadat",
      "Fatehpur Sikri",
      "Shahabad, Rampur",
      "Robertsganj",
      "Utraula",
      "Sadabad",
      "Rasra",
      "Lar",
      "Lal Gopalganj Nindaura",
      "Sirsaganj",
      "Pihani",
      "Shamsabad, Agra",
      "Rudrapur",
      "Soron",
      "SUrban Agglomerationr",
      "Samdhan",
      "Sahjanwa",
      "Rampur Maniharan",
      "Sumerpur",
      "Shahganj",
      "Tulsipur",
      "Tirwaganj",
      "PurqUrban Agglomerationzi",
      "Shamsabad, Farrukhabad",
      "Warhapur",
      "Powayan",
      "Sandi",
      "Achhnera",
      "Naraura",
      "Nakur",
      "Sahaspur",
      "Safipur",
      "Reoti",
      "Sikanderpur",
      "Saidpur",
      "Sirsi",
      "Purwa",
      "Parasi",
      "Lalganj",
      "Phulpur",
      "Shishgarh",
      "Sahawar",
      "Samthar",
      "Pukhrayan",
      "Obra",
      "Niwai",
      "Mirzapur",
    ],
    Bihar: [
      "Patna",
      "Gaya",
      "Bhagalpur",
      "Muzaffarpur",
      "Darbhanga",
      "Arrah",
      "Begusarai",
      "Chhapra",
      "Katihar",
      "Munger",
      "Purnia",
      "Saharsa",
      "Sasaram",
      "Hajipur",
      "Dehri-on-Sone",
      "Bettiah",
      "Motihari",
      "Bagaha",
      "Siwan",
      "Kishanganj",
      "Jamalpur",
      "Buxar",
      "Jehanabad",
      "Aurangabad",
      "Lakhisarai",
      "Nawada",
      "Jamui",
      "Sitamarhi",
      "Araria",
      "Gopalganj",
      "Madhubani",
      "Masaurhi",
      "Samastipur",
      "Mokameh",
      "Supaul",
      "Dumraon",
      "Arwal",
      "Forbesganj",
      "BhabUrban Agglomeration",
      "Narkatiaganj",
      "Naugachhia",
      "Madhepura",
      "Sheikhpura",
      "Sultanganj",
      "Raxaul Bazar",
      "Ramnagar",
      "Mahnar Bazar",
      "Warisaliganj",
      "Revelganj",
      "Rajgir",
      "Sonepur",
      "Sherghati",
      "Sugauli",
      "Makhdumpur",
      "Maner",
      "Rosera",
      "Nokha",
      "Piro",
      "Rafiganj",
      "Marhaura",
      "Mirganj",
      "Lalganj",
      "Murliganj",
      "Motipur",
      "Manihari",
      "Sheohar",
      "Maharajganj",
      "Silao",
      "Barh",
      "Asarganj",
    ],
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Nadiad",
      "Porbandar",
      "Anand",
      "Morvi",
      "Mahesana",
      "Bharuch",
      "Vapi",
      "Navsari",
      "Veraval",
      "Bhuj",
      "Godhra",
      "Palanpur",
      "Valsad",
      "Patan",
      "Deesa",
      "Amreli",
      "Anjar",
      "Dhoraji",
      "Khambhat",
      "Mahuva",
      "Keshod",
      "Wadhwan",
      "Ankleshwar",
      "Savarkundla",
      "Kadi",
      "Visnagar",
      "Upleta",
      "Una",
      "Sidhpur",
      "Unjha",
      "Mangrol",
      "Viramgam",
      "Modasa",
      "Palitana",
      "Petlad",
      "Kapadvanj",
      "Sihor",
      "Wankaner",
      "Limbdi",
      "Mandvi",
      "Thangadh",
      "Vyara",
      "Padra",
      "Lunawada",
      "Rajpipla",
      "Vapi",
      "Umreth",
      "Sanand",
      "Rajula",
      "Radhanpur",
      "Mahemdabad",
      "Ranavav",
      "Tharad",
      "Mansa",
      "Umbergaon",
      "Talaja",
      "Vadnagar",
      "Manavadar",
      "Salaya",
      "Vijapur",
      "Pardi",
      "Rapar",
      "Songadh",
      "Lathi",
      "Adalaj",
      "Chhapra",
      "Gandhinagar",
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Nizamabad",
      "Karimnagar",
      "Ramagundam",
      "Khammam",
      "Mahbubnagar",
      "Mancherial",
      "Adilabad",
      "Suryapet",
      "Jagtial",
      "Miryalaguda",
      "Nirmal",
      "Kamareddy",
      "Kothagudem",
      "Bodhan",
      "Palwancha",
      "Mandamarri",
      "Koratla",
      "Sircilla",
      "Tandur",
      "Siddipet",
      "Wanaparthy",
      "Kagaznagar",
      "Gadwal",
      "Sangareddy",
      "Bellampalle",
      "Bhongir",
      "Vikarabad",
      "Jangaon",
      "Bhadrachalam",
      "Bhainsa",
      "Farooqnagar",
      "Medak",
      "Narayanpet",
      "Sadasivpet",
      "Yellandu",
      "Manuguru",
      "Kyathampalle",
      "Nagarkurnool",
    ],
    Meghalaya: ["Shillong", "Tura", "Nongstoin"],
    "Himachal Praddesh": ["Manali"],
    "Arunachal Pradesh": ["Naharlagun", "Pasighat"],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Thane",
      "Nashik",
      "Kalyan-Dombivali",
      "Vasai-Virar",
      "Solapur",
      "Mira-Bhayandar",
      "Bhiwandi",
      "Amravati",
      "Nanded-Waghala",
      "Sangli",
      "Malegaon",
      "Akola",
      "Latur",
      "Dhule",
      "Ahmednagar",
      "Ichalkaranji",
      "Parbhani",
      "Panvel",
      "Yavatmal",
      "Achalpur",
      "Osmanabad",
      "Nandurbar",
      "Satara",
      "Wardha",
      "Udgir",
      "Aurangabad",
      "Amalner",
      "Akot",
      "Pandharpur",
      "Shrirampur",
      "Parli",
      "Washim",
      "Ambejogai",
      "Manmad",
      "Ratnagiri",
      "Uran Islampur",
      "Pusad",
      "Sangamner",
      "Shirpur-Warwade",
      "Malkapur",
      "Wani",
      "Lonavla",
      "Talegaon Dabhade",
      "Anjangaon",
      "Umred",
      "Palghar",
      "Shegaon",
      "Ozar",
      "Phaltan",
      "Yevla",
      "Shahade",
      "Vita",
      "Umarkhed",
      "Warora",
      "Pachora",
      "Tumsar",
      "Manjlegaon",
      "Sillod",
      "Arvi",
      "Nandura",
      "Vaijapur",
      "Wadgaon Road",
      "Sailu",
      "Murtijapur",
      "Tasgaon",
      "Mehkar",
      "Yawal",
      "Pulgaon",
      "Nilanga",
      "Wai",
      "Umarga",
      "Paithan",
      "Rahuri",
      "Nawapur",
      "Tuljapur",
      "Morshi",
      "Purna",
      "Satana",
      "Pathri",
      "Sinnar",
      "Uchgaon",
      "Uran",
      "Pen",
      "Karjat",
      "Manwath",
      "Partur",
      "Sangole",
      "Mangrulpir",
      "Risod",
      "Shirur",
      "Savner",
      "Sasvad",
      "Pandharkaoda",
      "Talode",
      "Shrigonda",
      "Shirdi",
      "Raver",
      "Mukhed",
      "Rajura",
      "Vadgaon Kasba",
      "Tirora",
      "Mahad",
      "Lonar",
      "Sawantwadi",
      "Pathardi",
      "Pauni",
      "Ramtek",
      "Mul",
      "Soyagaon",
      "Mangalvedhe",
      "Narkhed",
      "Shendurjana",
      "Patur",
      "Mhaswad",
      "Loha",
      "Nandgaon",
      "Warud",
    ],
    Goa: ["Marmagao", "Panaji", "Margao", "Mapusa"],
    "West Bengal": [
      "Kolkata",
      "Siliguri",
      "Asansol",
      "Raghunathganj",
      "Kharagpur",
      "Naihati",
      "English Bazar",
      "Baharampur",
      "Hugli-Chinsurah",
      "Raiganj",
      "Jalpaiguri",
      "Santipur",
      "Balurghat",
      "Medinipur",
      "Habra",
      "Ranaghat",
      "Bankura",
      "Nabadwip",
      "Darjiling",
      "Purulia",
      "Arambagh",
      "Tamluk",
      "AlipurdUrban Agglomerationr",
      "Suri",
      "Jhargram",
      "Gangarampur",
      "Rampurhat",
      "Kalimpong",
      "Sainthia",
      "Taki",
      "Murshidabad",
      "Memari",
      "Paschim Punropara",
      "Tarakeswar",
      "Sonamukhi",
      "PandUrban Agglomeration",
      "Mainaguri",
      "Malda",
      "Panchla",
      "Raghunathpur",
      "Mathabhanga",
      "Monoharpur",
      "Srirampore",
      "Adra",
    ],
  };

  const [states] = useState(Object.keys(statesWithCities));
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (selectedState) {
      setCities(statesWithCities[selectedState]);
      setSelectedCity("");
    }
  }, [selectedState]);

  const [filters, setFilters] = useState({
    names: [],
    priceRange: [0, 10000],
    sort: "",
  });

  useEffect(() => {
    localStorage.removeItem("buyNowItem");
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await ApiService.post(
        "/website-product/getWebsiteproductDetails",
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setProducts(response.data || []);
      setAllProducts(response.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // const productCounts = allProducts.reduce((acc, product) => {
  //   const name = product.name;
  //   const deviceCount = product.device?.length || 0;
  //   acc[name] = (acc[name] || 0) + deviceCount;
  //   return acc;
  // }, {});

  const productCounts = allProducts.reduce((acc, product) => {
    const name = product.name;

    // Filter devices like in code1
    const validDevices = Array.isArray(product.device)
      ? product.device.filter(
          (device) => device && device.id && device.image && device.name
          // &&
          // typeof device.amount === "number" &&
          // typeof device.subscriptionMonthlyAmt === "number" &&
          // typeof device.discount === "number"
        )
      : [];

    const deviceCount = validDevices.length;

    acc[name] = (acc[name] || 0) + deviceCount;
    return acc;
  }, {});

  const uniqueProductNames = Object.keys(productCounts);

  const handleCheckboxChange = (name) => {
    setFilters((prev) => {
      const newNames = prev.names.includes(name)
        ? prev.names.filter((n) => n !== name)
        : [...prev.names, name];
      return { ...prev, names: newNames };
    });
  };

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: [0, Number(value)] }));
  };

  const filteredProducts = allProducts
    .filter((p) => {
      if (filters.names.length === 0) return true;
      return filters.names.includes(p.name);
    })
    .filter((p) => {
      return p.device.some(
        (d) => d.amount + d.subscriptionMonthlyAmt <= filters.priceRange[1]
      );
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice =
      a.device?.[0]?.amount + a.device?.[0]?.subscriptionMonthlyAmt || 0;
    const bPrice =
      b.device?.[0]?.amount + b.device?.[0]?.subscriptionMonthlyAmt || 0;

    if (filters.sort === "low") return aPrice - bPrice;
    if (filters.sort === "high") return bPrice - aPrice;
    if (filters.sort === "az") return a.name.localeCompare(b.name);
    if (filters.sort === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  const handleAddToCart = (device) => {
    setSelectedProduct(device);
    setShowProductModal(true);
  };

  return (
    <div className="products-container">
      <div className="products-heading-container">
        <h1 className="products-title section-heading">Devices</h1>
      </div>
      <div className="products-sidebar-container">
        <div className="sidebar-wrapper">
          {/* <div className="location-filter-wrapper">
            <label className="state-select-label" htmlFor="state-select">
              Select State
            </label>
            <select
              id="state-select"
              onChange={(e) => setSelectedState(e.target.value)}
              className="state-select-dropdown"
              value={selectedState}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <label className="city-select-label" htmlFor="city-select">
              Select City
            </label>
            <select
              id="city-select"
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`city-select-dropdown ${
                !selectedState ? "disabled-dropdown" : ""
              }`}
              value={selectedCity}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div> */}

          <div className="filter-group product-filter-group">
            <h2 className="subsection-heading">Products</h2>
            {uniqueProductNames.map((productName) => (
              <label
                key={productName}
                className="checkbox-label product-checkbox-label"
              >
                <div className="checkbox-container product-checkbox-container">
                  <input
                    type="checkbox"
                    className="products-filter-checkbox checkbox-input"
                    checked={filters.names.includes(productName)}
                    onChange={() => handleCheckboxChange(productName)}
                  />
                  <span className="product-name checkbox-name">
                    {productName}
                  </span>
                </div>
                <div className="count-container product-count-container">
                  <span className="product-count count-badge">
                    {productCounts[productName]}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="filter-group price-filter-group">
            <h2 className="subsection-heading">Price</h2>
            <input
              type="range"
              min="0"
              max="10000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="price-slider"
            />
            <div className="price-range price-display">
              Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </div>
          </div>

          <div className="filters-wrapper sort-filter-wrapper">
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              className="filter-select sort-select"
              value={filters.sort}
            >
              <option value="">Sort By</option>
              <option value="low">Price Low to High</option>
              <option value="high">Price High to Low</option>
              <option value="az">Name A to Z</option>
              <option value="za">Name Z to A</option>
            </select>
          </div>
        </div>

        <div className="productsPage-main-container">
          <div className="products-grid">
            {sortedProducts
              .filter(
                (product) =>
                  Array.isArray(product.device) && product.device.length > 0
              )
              .map((product) =>
                product.device
                  .filter(
                    (device) =>
                      device && device.id && device.image && device.name
                    // &&
                    // typeof device.amount === "number" &&
                    // typeof device.subscriptionMonthlyAmt === "number" &&
                    // typeof device.discount === "number"
                  )
                  .map((device) => {
                    const startPrice =
                      ((device.amount + device.subscriptionMonthlyAmt) *
                        (100 - device.discount)) /
                      100;

                    const matchedItem = cartItems.find(
                      (item) => item.device.id === device.id
                    );

                    return (
                      <div
                        key={device.id}
                        className="product-card-productnew product-card-custom"
                      >
                        <div className="product-card-inner">
                          <Link
                            to={`/product/${device.id}`}
                            state={{ device }}
                            className="product-image-wrapper"
                          >
                            <img
                              src={device.image}
                              alt={device.model}
                              className="products-product-image"
                            />
                          </Link>

                          <div className="product-info">
                            <h2 className="product-name">{device.name}</h2>
                            <p className="product-description">
                              {device.description}
                            </p>
                            <div className="product-old-price-container">
                              <p className="product-base-price">
                                Rs.{device.amount}
                              </p>
                              <span className="product-price-discount">
                                -{device.discount}%
                              </span>
                            </div>
                            <p className="product-price">
                              From Rs.{startPrice}/-
                            </p>
                            <div className="product-buttons">
                              {matchedItem ? (
                                <div className="quantity-controls">
                                  <button
                                    className="products-add-cart"
                                    onClick={() => handleAddToCart(device)}
                                    onMouseEnter={() => setHovered(device.id)}
                                    onMouseLeave={() => setHovered(false)}
                                  >
                                    {hovered === device.id
                                      ? "Update Cart"
                                      : "Added"}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="button products-add-cart"
                                  onClick={() => handleAddToCart(device)}
                                >
                                  Add Cart
                                </button>
                              )}

                              <button
                                className="button products-buy-now"
                                onClick={() => handleAddToCart(device)}
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
          </div>
        </div>
      </div>

      {showProductModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowProductModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowProductModal(false)}
            >
              ×
            </button>
            <ProductPopupPage
              device={selectedProduct}
              isOpen={showProductModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;

class OfflineAIEngine {constructor() {
        this.version = "0.9";
        this.context = {
            userName: "Bạn",
            lastTopic: null,
            lastEntity: null,
            chatCount: 0,
            mood: "happy",
            history: [],
            lastFailedText: ""};
        this.stopWords = new Set([
            "là", "thì", "mà", "và", "cho", "tôi", "mình", "bạn", "có",
            "được", "không", "nhỉ", "nào", "với", "ở", "trong", "đang",
            "muốn", "hỏi", "giúp", "hãy", "the", "a", "an"
        ]);

        this.aliases = {
            "ong bay": "ông bảy",
            "ongbay": "ông bảy",
            "tam den": "tám đen",
            "tamden": "tám đen",
            "kieu my": "kiều my",
            "bhx": "bách hóa",
            "bach hoa": "bách hóa",
            "huakai po": "huaka'i pō",
            "huakai": "huaka'i pō",
            "ai": "ai",
            "bot": "ai"
        };

this.intents = [{   name: "view-source",
                keywords: ["amazx"],
                responses: [
            "ok,hệ thống AI bình thường",
            "ok,hoạt động"]}, //<= kiểm tra và viết thêm
          {   name: "thuonglai",
                keywords: ["cá"],
                responses: [
            "cá ư. trong game bạn chỉ cần ra ao bắt cá rồi bán cá",
            "cá...?"]},
            {
                name: "hi",
                keywords: ["chào", "hello", "hi", "alo", "ê", "hey", "chao"],
                responses: [
                    "Chào bạn! AI của Phước Vinh 3D đã online.",
                    "Alo! Tôi đang nghe đây. Hỏi gì cứ ném sang tôi.",
                    "Chào bro! Hôm nay định làm giàu, khám phá hay quậy xã?"
                ]
            },
            {
                name: "who",
                keywords: ["bạn là ai", "tên gì", "giới thiệu", "ai vậy", "mày là ai", "bạn là gì"],
                responses: [
                    "Tôi là trợ lý AI offline của Phước Vinh 3D, bản 0 Tôi đọc được câu hỏi theo ý định, nhớ ngữ cảnh gần đây và có thể xem trạng thái game.",
                    "Tôi là AI 2.0 của Phước Vinh 3D. Không cần Internet để suy luận các câu hỏi đã có kiến thức trong game."
                ]
            },
            {
                name: "help",
                keywords: ["trợ giúp", "hướng dẫn", "phím", "nút", "chơi sao", "làm sao chơi"],
                responses: [
                    "🎮 PC: WASD di chuyển, E tương tác, F đánh, P gieo hạt. Mobile dùng joystick và các nút cảm ứng."
                ]
            },
  {
    name: "vietnam",
    keywords: ["thủ đô việt nam", "thủ đô của việt nam"],
    responses: ["Thủ đô của Việt Nam là Hà Nội. Đây là trung tâm chính trị, văn hóa và kinh tế quan trọng hàng đầu của đất nước, nằm ở khu vực đồng bằng sông Hồng."]
  },
  {
    name: "thailand",
    keywords: ["thủ đô thái lan", "thủ đô của thái lan"],
    responses: ["Thủ đô của Thái Lan là Bangkok (tên chính thức: Krung Thep Maha Nakhon). Đây là trung tâm kinh tế, văn hóa và du lịch sầm uất nhất của đất nước."]
  },
  {
    name: "laos",
    keywords: ["thủ đô lào", "thủ đô của lào"],
    responses: ["Thủ đô của Lào là Viêng Chăn (Vientiane). Thành phố nằm bên sông Mê Kông, là trung tâm chính trị và kinh tế lớn nhất nước Lào."]
  },
  {
    name: "cambodia",
    keywords: ["thủ đô campuchia", "thủ đô của campuchia"],
    responses: ["Thủ đô của Campuchia là Phnom Penh. Đây là trung tâm chính trị, kinh tế và văn hóa lớn nhất của Vương quốc Campuchia."]
  },
  {
    name: "indonesia",
    keywords: ["thủ đô indonesia", "thủ đô của indonesia"],
    responses: ["Thủ đô của Indonesia là Nusantara (được xây dựng thay thế Jakarta). Thành phố nằm trên đảo Borneo, hướng tới mô hình đô thị xanh và thông minh."]
  },
  {
    name: "malaysia",
    keywords: ["thủ đô malaysia", "thủ đô của malaysia"],
    responses: ["Thủ đô chính thức của Malaysia là Kuala Lumpur. Ngoài ra, Putrajaya đóng vai trò là trung tâm hành chính liên bang của quốc gia này."]
  },
  {
    name: "singapore",
    keywords: ["thủ đô singapore", "thủ đô của singapore"],
    responses: ["Singapore là một quốc gia thành phố (quốc đảo), do đó thủ đô của Singapore chính là thành phố Singapore."]
  },
  {
    name: "philippines",
    keywords: ["thủ đô philippines", "thủ đô của philippines"],
    responses: ["Thủ đô của Philippines là Manila. Nằm ở bờ phía đông của vịnh Manila, đây là trung tâm kinh tế và văn hóa sầm uất của đảo quốc."]
  },
  {
    name: "myanmar",
    keywords: ["thủ đô myanmar", "thủ đô của myanmar"],
    responses: ["Thủ đô của Myanmar là Naypyidaw. Thành phố được xây dựng quy hoạch hiện đại và chính thức thay thế Yangon làm thủ đô từ năm 2005."]
  },
  {
    name: "brunei",
    keywords: ["thủ đô brunei", "thủ đô của brunei"],
    responses: ["Thủ đô của Brunei là Bandar Seri Begawan. Đây là trung tâm thương mại, văn hóa và hành chính của vương quốc Brunei."]
  },
  {
    name: "east-timor",
    keywords: ["thủ đô đông timor", "thủ đô của đông timor"],
    responses: ["Thủ đô của Đông Timor (Timor-Leste) là Dili. Đây là thành phố cảng chính và là trung tâm thương mại lớn nhất của quốc gia này."]
  },
  {
    name: "japan",
    keywords: ["thủ đô nhật bản", "thủ đô của nhật bản"],
    responses: ["Thủ đô của Nhật Bản là Tokyo. Đây là siêu đô thị đông dân, hiện đại bậc nhất thế giới và là trung tâm tài chính lớn của Châu Á."]
  },
  {
    name: "korea",
    keywords: ["thủ đô hàn quốc", "thủ đô của hàn quốc"],
    responses: ["Thủ đô của Hàn Quốc là Seoul. Đây là đô thị phát triển năng động, trung tâm kinh tế, công nghệ và văn hóa giải trí toàn cầu."]
  },
  {
    name: "china",
    keywords: ["thủ đô trung quốc", "thủ đô của trung quốc"],
    responses: ["Thủ đô của Trung Quốc là Bắc Kinh (Beijing). Đây là trung tâm chính trị, văn hóa và giáo dục lớn nhất của đất nước tỷ dân."]
  },
  {
    name: "north-korea",
    keywords: ["thủ đô triều tiên", "thủ đô của triều tiên"],
    responses: ["Thủ đô của Triều Tiên (Cộng hòa Dân chủ Nhân dân Triều Tiên) là Bình Nhưỡng (Pyongyang). Đây là trung tâm chính trị và lịch sử của quốc gia."]
  },
  {
    name: "mongolia",
    keywords: ["thủ đô mông cổ", "thủ đô của mông cổ"],
    responses: ["Thủ đô của Mông Cổ là Ulaanbaatar. Thành phố nằm ở thung lũng sông Tuul, là trung tâm văn hóa, tài chính và công nghiệp của Mông Cổ."]
  },
  {
    name: "india",
    keywords: ["thủ đô ấn độ", "thủ đô của ấn độ"],
    responses: ["Thủ đô của Ấn Độ là New Delhi. Thành phố này là trung tâm hành chính và chính trị của quốc gia, nằm trong vùng đô thị Delhi."]
  },
  {
    name: "pakistan",
    keywords: ["thủ đô pakistan", "thủ đô của pakistan"],
    responses: ["Thủ đô của Pakistan là Islamabad. Thành phố được xây dựng theo quy hoạch hiện đại vào thập niên 1960 để thay thế Karachi."]
  },
  {
    name: "bangladesh",
    keywords: ["thủ đô bangladesh", "thủ đô của bangladesh"],
    responses: ["Thủ đô của Bangladesh là Dhaka. Nằm bên sông Buriganga, đây là trung tâm văn hóa, thương mại và chính trị lớn nhất quốc gia."]
  },
  {
    name: "sri-lanka",
    keywords: ["thủ đô sri lanka", "thủ đô của sri lanka"],
    responses: ["Thủ đô hành chính của Sri Lanka là Sri Jayawardenepura Kotte, trong khi Colombo là thủ đô thương mại và là thành phố lớn nhất."]
  },
  {
    name: "nepal",
    keywords: ["thủ đô nepal", "thủ đô của nepal"],
    responses: ["Thủ đô của Nepal là Kathmandu. Thành phố nằm ở thung lũng Kathmandu, nổi tiếng với lịch sử lâu đời và nhiều di sản văn hóa."]
  },
  {
    name: "bhutan",
    keywords: ["thủ đô bhutan", "thủ đô của bhutan"],
    responses: ["Thủ đô của Bhutan là Thimphu. Đây là trung tâm chính trị và kinh tế của vương quốc, nằm ở miền tây dãy Himalaya."]
  },
  {
    name: "maldives",
    keywords: ["thủ đô maldives", "thủ đô của maldives"],
    responses: ["Thủ đô của Maldives là Malé. Đây là một trong những thành phố có mật độ dân số cao nhất thế giới, nằm trên đảo đảo Malé."]
  },
  {
    name: "afghanistan",
    keywords: ["thủ đô afghanistan", "thủ đô của afghanistan"],
    responses: ["Thủ đô của Afghanistan là Kabul. Thành phố nằm ở thung lũng hẹp ven sông Kabul, là trung tâm kinh tế và văn hóa của đất nước."]
  },
  {
    name: "kazakhstan",
    keywords: ["thủ đô kazakhstan", "thủ đô của kazakhstan"],
    responses: ["Thủ đô của Kazakhstan là Astana (trước đây còn có tên là Nur-Sultan). Đây là đô thị quy hoạch hiện đại nằm ở khu vực phía bắc."]
  },
  {
    name: "uzbekistan",
    keywords: ["thủ đô uzbekistan", "thủ đô của uzbekistan"],
    responses: ["Thủ đô của Uzbekistan là Tashkent. Đây là thành phố lớn nhất Trung Á và là trung tâm văn hóa, công nghiệp của đất nước."]
  },
  {
    name: "turkmenistan",
    keywords: ["thủ đô turkmenistan", "thủ đô của turkmenistan"],
    responses: ["Thủ đô của Turkmenistan là Ashgabat. Thành phố nổi tiếng với kiến trúc cẩm thạch trắng độc đáo nằm giữa sa mạc Karakum."]
  },
  {
    name: "kyrgyzstan",
    keywords: ["thủ đô kyrgyzstan", "thủ đô của kyrgyzstan"],
    responses: ["Thủ đô của Kyrgyzstan là Bishkek. Thành phố nằm ở thung lũng sông Chuy, gần ranh giới với Kazakhstan."]
  },
  {
    name: "tajikistan",
    keywords: ["thủ đô tajikistan", "thủ đô của tajikistan"],
    responses: ["Thủ đô của Tajikistan là Dushanbe. Tên thành phố trong tiếng Tajik có nghĩa là 'Thứ Hai', xuất phát từ chợ phiên lịch sử họp vào ngày này."]
  },
  {
    name: "saudi-arabia",
    keywords: ["thủ đô ả rập xê út", "thủ đô của ả rập xê út"],
    responses: ["Thủ đô của Saudi Arabia (Ả Rập Xê Út) là Riyadh. Thành phố nằm ở trung tâm bán đảo Ả Rập, là trung tâm tài chính và thương mại lớn."]
  },
  {
    name: "uae",
    keywords: ["thủ đô uae", "thủ đô của uae", "thủ đô các tiểu vương quốc ả rập thống nhất"],
    responses: ["Thủ đô của UAE (Các Tiểu vương quốc Ả Rập Thống nhất) là Abu Dhabi (thường hay bị nhầm lẫn với Dubai)."]
  },
  {
    name: "qatar",
    keywords: ["thủ đô qatar", "thủ đô của qatar"],
    responses: ["Thủ đô của Qatar là Doha. Thành phố nằm ven vịnh Ba Tư, là trung tâm thương mại và tài chính hiện đại hàng đầu khu vực."]
  },
  {
    name: "turkey",
    keywords: ["thủ đô thổ nhĩ kỳ", "thủ đô của thổ nhĩ kỳ"],
    responses: ["Thủ đô của Thổ Nhĩ Kỳ là Ankara (thường hay bị nhầm với Istanbul). Thành phố nằm ở trung tâm vùng Anatolia."]
  },
  {
    name: "iran",
    keywords: ["thủ đô iran", "thủ đô của iran"],
    responses: ["Thủ đô của Iran là Tehran. Thành phố nằm dưới chân dãy núi Alborz, là trung tâm chính trị, văn hóa và công nghiệp của đất nước."]
  },
  {
    name: "iraq",
    keywords: ["thủ đô iraq", "thủ đô của iraq"],
    responses: ["Thủ đô của Iraq là Baghdad. Nằm bên sông Tigris, đây là một trong những thành phố mang tính lịch sử lâu đời nhất thế giới Hồi giáo."]
  },
  {
    name: "israel",
    keywords: ["thủ đô israel", "thủ đô của israel"],
    responses: ["Thủ đô Tuyên bố của Israel là Jerusalem. Tuy nhiên, nhiều quốc gia đặt đại sứ quán tại Tel Aviv do tranh chấp pháp lý quốc tế."]
  },
  {
    name: "palestine",
    keywords: ["thủ đô palestine", "thủ đô của palestine"],
    responses: ["Palestine tuyên bố Đông Jerusalem là thủ đô, trong khi Ramallah hiện đóng vai trò là trung tâm hành chính thực tế."]
  },
  {
    name: "jordan",
    keywords: ["thủ đô jordan", "thủ đô của jordan"],
    responses: ["Thủ đô của Jordan là Amman. Đây là trung tâm thương mại, tài chính và văn hóa lớn nhất của Vương quốc Jordan."]
  },
  {
    name: "lebanon",
    keywords: ["thủ đô lí băng", "thủ đô của lí băng", "thủ đô lebanon"],
    responses: ["Thủ đô của Lebanon (Lí Băng) là Beirut. Thành phố cảng nằm bên bờ Địa Trung Hải, từng được mệnh danh là 'Paris của Trung Đông'."]
  },
  {
    name: "syria",
    keywords: ["thủ đô syria", "thủ đô của syria"],
    responses: ["Thủ đô của Syria là Damascus. Đây được coi là một trong những thủ đô liên tục có người sinh sống lâu đời nhất trên thế giới."]
  },
  {
    name: "yemen",
    keywords: ["thủ đô yemen", "thủ đô của yemen"],
    responses: ["Thủ đô theo hiến pháp của Yemen là Sana'a. Do xung đột, Aden hiện đóng vai trò là thủ đô tạm thời của chính phủ."]
  },
  {
    name: "oman",
    keywords: ["thủ đô oman", "thủ đô của oman"],
    responses: ["Thủ đô của Oman là Muscat. Thành phố cảng cổ kính nằm bên vịnh Oman, nổi tiếng với sự kết hợp giữa hiện đại và truyền thống."]
  },
  {
    name: "kuwait",
    keywords: ["thủ đô kuwait", "thủ đô của kuwait"],
    responses: ["Thủ đô của Kuwait là Thành phố Kuwait (Kuwait City). Thành phố là trung tâm tài chính và văn hóa nằm bên vịnh Ba Tư."]
  },
  {
    name: "bahrain",
    keywords: ["thủ đô bahrain", "thủ đô của bahrain"],
    responses: ["Thủ đô của Bahrain là Manama. Đây là trung tâm thương mại và tài chính quan trọng trong vùng vịnh Ba Tư."]
  },
  {
    name: "cyprus",
    keywords: ["thủ đô đảo đảo síp", "thủ đô của síp", "thủ đô cyprus"],
    responses: ["Thủ đô của Cyprus (Síp) là Nicosia. Đây là thủ đô cuối cùng trên thế giới vẫn đang bị chia cắt bởi ranh giới quân sự."]
  },
  {
    name: "georgia",
    keywords: ["thủ đô georgia", "thủ đô của georgia"],
    responses: ["Thủ đô của Georgia là Tbilisi. Thành phố nằm bên sông Kura, nổi tiếng với kiến trúc đa dạng và lịch sử lâu đời."]
  },
  {
    name: "armenia",
    keywords: ["thủ đô armenia", "thủ đô của armenia"],
    responses: ["Thủ đô của Armenia là Yerevan. Nổi tiếng với tên gọi 'Thành phố hồng' do xây dựng bằng đá tuyn hồng, đây là một trong những thành phố cổ nhất thế giới."]
  },
  {
    name: "azerbaijan",
    keywords: ["thủ đô azerbaijan", "thủ đô của azerbaijan"],
    responses: ["Thủ đô của Azerbaijan là Baku. Thành phố cảng nằm bên biển Caspian, nổi tiếng với sự kết hợp giữa thành cổ lịch sử và kiến trúc tương lai."]
  },
  {
    name: "france",
    keywords: ["thủ đô pháp", "thủ đô của pháp"],
    responses: ["Thủ đô của Pháp là Paris. Được mệnh danh là 'Kinh đô Ánh sáng', Paris là trung tâm toàn cầu về nghệ thuật, thời trang, ẩm thực và văn hóa."]
  },
  {
    name: "germany",
    keywords: ["thủ đô đức", "thủ đô của đức"],
    responses: ["Thủ đô của Đức là Berlin. Thành phố nổi tiếng với lịch sử lâu đời, kiến trúc độc đáo và là trung tâm văn hóa - nghệ thuật sôi động của Châu Âu."]
  },
  {
    name: "netherlands",
    keywords: ["thủ đô hà lan", "thủ đô của hà lan"],
    responses: ["Thủ đô của Hà Lan là Amsterdam. Tuy nhiên, The Hague (La Haye) mới là nơi đặt trụ sở chính phủ, Quốc hội và Hoàng gia Hà Lan."]
  },
  {
    name: "belgium",
    keywords: ["thủ đô bỉ", "thủ đô của bỉ"],
    responses: ["Thủ đô của Bỉ là Brussels. Thành phố cũng được coi là 'thủ đô thực tế' của Liên minh Châu Âu (EU) vì nơi đây đặt headquarters của nhiều cơ quan chính."]
  },
  {
    name: "switzerland",
    keywords: ["thủ đô thụy sĩ", "thủ đô của thụy sĩ"],
    responses: ["Thụy Sĩ không có thủ đô chính thức theo hiến pháp, nhưng Bern đóng vai trò là 'thành phố liên bang' và là trung tâm hành chính thực tế của nước này."]
  },
  {
    name: "austria",
    keywords: ["thủ đô áo", "thủ đô của áo"],
    responses: ["Thủ đô của Áo là Vienna (Wien). Nằm bên sông Danube, đây là trung tâm âm nhạc cổ điển thế giới và từng là thủ đô của Đế quốc Áo-Hung."]
  },
  {
    name: "luxembourg",
    keywords: ["thủ đô luxembourg", "thủ đô của luxembourg"],
    responses: ["Thủ đô của đại công quốc Luxembourg là Thành phố Luxembourg (Luxembourg City). Thành phố nổi tiếng với vị thế tài chính và các hẻm núi pháo đài cổ."]
  },
  {
    name: "monaco",
    keywords: ["thủ đô monaco", "thủ đô của monaco"],
    responses: ["Monaco là một quốc gia thành phố (vương quốc công quốc), do đó thủ đô của Monaco chính là Monaco."]
  },
  {
    name: "liechtenstein",
    keywords: ["thủ đô liechtenstein", "thủ đô của liechtenstein"],
    responses: ["Thủ đô của Liechtenstein là Vaduz. Đây là nơi đặt đại bản doanh của Thân vương quốc Liechtenstein và Quốc hội nước này."]
  },
  {
    name: "uk",
    keywords: ["thủ đô anh", "thủ đô của anh"],
    responses: ["Thủ đô của Vương quốc Anh là London. Nằm bên sông Thames, đây là một trong những trung tâm tài chính, văn hóa và lịch sử tầm cỡ thế giới."]
  },
  {
    name: "ireland",
    keywords: ["thủ đô ai len", "thủ đô của ai len", "thủ đô ireland"],
    responses: ["Thủ đô của Ireland là Dublin. Thành phố nằm ở bờ biển phía đông, nổi tiếng với di sản văn hóa, văn học và công nghệ hiện đại."]
  },
  {
    name: "sweden",
    keywords: ["thủ đô thụy điển", "thủ đô của thụy điển"],
    responses: ["Thủ đô của Thụy Điển là Stockholm. Thành phố trải dài trên 14 hòn đảo ở nơi hồ Mälaren chảy vào biển Baltic."]
  },
  {
    name: "norway",
    keywords: ["thủ đô na uy", "thủ đô của na uy"],
    responses: ["Thủ đô của Na Uy là Oslo. Thành phố nằm ở đầu vịnh Oslofjord, nổi tiếng với không gian xanh và các bảo tàng hàng hải lâu đời."]
  },
  {
    name: "denmark",
    keywords: ["thủ đô đan mạch", "thủ đô của đan mạch"],
    responses: ["Thủ đô của Đan Mạch là Copenhagen. Thành phố nổi tiếng với văn hóa đi xe đạp, tượng Nàng tiên cá và chất lượng sống hàng đầu thế giới."]
  },
  {
    name: "finland",
    keywords: ["thủ đô phần lan", "thủ đô của phần lan"],
    responses: ["Thủ đô của Phần Lan là Helsinki. Đây là thành phố cảng xinh đẹp nằm ven biển Baltic, nổi tiếng với kiến trúc thiết kế hiện đại."]
  },
  {
    name: "iceland",
    keywords: ["thủ đô băng đảo", "thủ đô iceland", "thủ đô của iceland"],
    responses: ["Thủ đô của Iceland là Reykjavík. Đây là thủ đô nằm xa nhất về phía bắc của một quốc gia chủ quyền trên thế giới."]
  },
  {
    name: "estonia",
    keywords: ["thủ đô estonia", "thủ đô của estonia"],
    responses: ["Thủ đô của Estonia là Tallinn. Thành phố nổi tiếng với khu phố cổ thời Trung cổ được bảo tồn hoàn hảo và là trung tâm công nghệ tiên tiến."]
  },
  {
    name: "latvia",
    keywords: ["thủ đô latvia", "thủ đô của latvia"],
    responses: ["Thủ đô của Latvia là Riga. Thành phố nổi tiếng với kiến trúc Art Nouveau độc đáo và khu phố cổ được UNESCO công nhận."]
  },
  {
    name: "lithuania",
    keywords: ["thủ đô lithuania", "thủ đô của lithuania"],
    responses: ["Thủ đô của Lithuania là Vilnius. Thành phố cổ kính nổi tiếng với phố cổ mang phong cách Baroque lớn bậc nhất Châu Âu."]
  },
  {
    name: "italy",
    keywords: ["thủ đô ý", "thủ đô của ý"],
    responses: ["Thủ đô của Ý (Italia) là Roma (Rome). Thành phố cổ kính này từng là trung tâm của Đế quốc La Mã và bao quanh quốc gia độc lập Tòa thánh Vatican."]
  },
  {
    name: "spain",
    keywords: ["thủ đô tây ban nha", "thủ đô của tây ban nha"],
    responses: ["Thủ đô của Tây Ban Nha là Madrid. Nằm ở trung tâm bán đảo Bán đảo Iberia, đây là thành phố nghệ thuật, lịch sử và văn hóa sôi động."]
  },
  {
    name: "portugal",
    keywords: ["thủ đô bồ đào nha", "thủ đô của bồ đào nha"],
    responses: ["Thủ đô của Bồ Đào Nha là Lisbon. Thành phố cảng nằm bên bờ Đại Tây Dương, nổi tiếng với những con dốc lịch sử và xe điện màu vàng."]
  },
  {
    name: "greece",
    keywords: ["thủ đô hy lạp", "thủ đô của hy lạp"],
    responses: ["Thủ đô của Hy Lạp là Athens. Đây là một trong những thành phố cổ nhất thế giới, được coi là nôi của văn minh phương Tây và dân chủ."]
  },
  {
    name: "croatia",
    keywords: ["thủ đô croatia", "thủ đô của croatia"],
    responses: ["Thủ đô của Croatia là Zagreb. Thành phố nằm ở miền bắc nước này, nổi tiếng với kiến trúc đậm chất Trung Âu thời Áo-Hung."]
  },
  {
    name: "serbia",
    keywords: ["thủ đô serbia", "thủ đô của serbia"],
    responses: ["Thủ đô của Serbia là Belgrade. Thành phố nằm ở điểm giao nhau của sông Sava và sông Danube, có lịch sử lâu đời qua nhiều đế chế."]
  },
  {
    name: "slovenia",
    keywords: ["thủ đô slovenia", "thủ đô của slovenia"],
    responses: ["Thủ đô của Slovenia là Ljubljana. Thành phố thanh bình nổi tiếng với lâu đài cổ, sông Ljubljanica và văn hóa sống xanh."]
  },
  {
    name: "bosnia",
    keywords: ["thủ đô bosnia", "thủ đô của bosnia"],
    responses: ["Thủ đô của Bosnia và Herzegovina là Sarajevo. Thành phố nằm trong thung lũng được bao quanh bởi Dãy Alps Dinaric."]
  },
  {
    name: "albania",
    keywords: ["thủ đô albania", "thủ đô của albania"],
    responses: ["Thủ đô của Albania là Tirana. Thành phố tràn ngập sắc màu với sự pha trộn giữa kiến trúc Ottoman, Ý và thời kỳ hậu Xô Viết."]
  },
  {
    name: "north-macedonia",
    keywords: ["thủ đô bắc macedonia", "thủ đô của bắc macedonia"],
    responses: ["Thủ đô của Bắc Macedonia là Skopje. Thành phố nằm trên dòng sông Vardar, nổi tiếng với hàng trăm bức tượng điêu khắc đồ sộ."]
  },
  {
    name: "montenegro",
    keywords: ["thủ đô montenegro", "thủ đô của montenegro"],
    responses: ["Thủ đô của Montenegro là Podgorica. Đây là trung tâm hành chính, kinh tế và giáo dục lớn nhất nước này."]
  },
  {
    name: "malta",
    keywords: ["thủ đô malta", "thủ đô của malta"],
    responses: ["Thủ đô của Malta là Valletta. Đây là thủ đô nhỏ nhất trong Liên minh Châu Âu nhưng sở hữu mật độ di sản lịch sử dày đặc."]
  },
  {
    name: "san-marino",
    keywords: ["thủ đô san marino", "thủ đô của san marino"],
    responses: ["Thủ đô của San Marino là Thành phố San Marino (City of San Marino). Nằm trên đỉnh núi Titano, đây là một trong những cộng hòa lâu đời nhất thế giới."]
  },
  {
    name: "vatican",
    keywords: ["thủ đô vatican", "thủ đô của vatican"],
    responses: ["Vatican là quốc gia độc lập nhỏ nhất thế giới nằm trong lòng thành phố Roma, do đó thủ đô của Vatican chính là Thành phố Vatican."]
  },
  {
    name: "andorra",
    keywords: ["thủ đô andorra", "thủ đô của andorra"],
    responses: ["Thủ đô của Andorra là Andorra la Vella. Đây là thủ đô nằm ở độ cao cao nhất Châu Âu (1.023m so với mực nước biển)."]
  },
  {
    name: "russia",
    keywords: ["thủ đô nga", "thủ đô của nga"],
    responses: ["Thủ đô của Nga là Moskva (Moscow). Thành phố này là trung tâm chính trị, kinh tế, khoa học và văn hóa lớn nhất của Liên bang Nga."]
  },
  {
    name: "ukraine",
    keywords: ["thủ đô ukraine", "thủ đô của ukraine"],
    responses: ["Thủ đô của Ukraine là Kyiv (Kiev). Thành phố cổ kính nằm bên sông Dnipro, là trung tâm văn hóa và công nghiệp quan trọng của Đông Âu."]
  },
  {
    name: "poland",
    keywords: ["thủ đô ba lan", "thủ đô của ba lan"],
    responses: ["Thủ đô của Ba Lan là Warszawa (Warsaw). Thành phố bên sông Vistula nổi tiếng với tinh thần kiên cường tái thiết sau Thế chiến II."]
  },
  {
    name: "romania",
    keywords: ["thủ đô romania", "thủ đô của romania"],
    responses: ["Thủ đô của Romania là Bucharest. Thành phố từng được mệnh danh là 'Paris của phương Đông' nhờ kiến trúc Tân cổ điển độc đáo."]
  },
  {
    name: "czech-republic",
    keywords: ["thủ đô séc", "thủ đô của séc", "thủ đô cộng hòa séc"],
    responses: ["Thủ đô của Cộng hòa Séc là Praha (Prague). Thành phố cổ kính được mệnh danh là 'Thành phố vàng' hay 'Thành phố hàng trăm ngọn tháp'."]
  },
  {
    name: "hungary",
    keywords: ["thủ đô hungary", "thủ đô của hungary"],
    responses: ["Thủ đô của Hungary là Budapest. Thành phố được hợp nhất từ hai bờ sông Danube: thành cổ Buda và đô thị nhộn nhịp Pest."]
  },
  {
    name: "belarus",
    keywords: ["thủ đô belarus", "thủ đô của belarus"],
    responses: ["Thủ đô của Belarus là Minsk. Đây là trung tâm chính trị và công nghiệp lớn nhất nước này, nằm bên sông Svislach."]
  },
  {
    name: "bulgaria",
    keywords: ["thủ đô bulgaria", "thủ đô của bulgaria"],
    responses: ["Thủ đô của Bulgaria là Sofia. Nằm dưới chân núi Vitosha, đây là một trong những đô thị cổ xưa nhất tại Châu Âu."]
  },
  {
    name: "slovakia",
    keywords: ["thủ đô slovakia", "thủ đô của slovakia"],
    responses: ["Thủ đô của Slovakia là Bratislava. Thành phố giáp ranh trực tiếp với cả hai quốc gia Áo và Hungary."]
  },
  {
    name: "moldova",
    keywords: ["thủ đô moldova", "thủ đô của moldova"],
    responses: ["Thủ đô của Moldova là Chișinău. Đây là trung tâm công nghiệp và thương mại lớn nhất nước, nổi tiếng với nhiều công viên xanh."]
  },
  {
    name: "egypt",
    keywords: ["thủ đô ai cập", "thủ đô của ai cập"],
    responses: ["Thủ đô của Ai Cập là Cairo. Nằm bên dòng sông Nile, đây là thành phố lớn nhất thế giới Ả Rập và nổi tiếng với quần thể Kim Tự Tháp Giza."]
  },
  {
    name: "algeria",
    keywords: ["thủ đô algeria", "thủ đô của algeria"],
    responses: ["Thủ đô của Algeria là Algiers. Thành phố cảng nằm bên Địa Trung Hải này nổi tiếng với những tòa nhà màu trắng soi bóng xuống biển."]
  },
  {
    name: "morocco",
    keywords: ["thủ đô ma rốc", "thủ đô của ma rốc", "thủ đô morocco"],
    responses: ["Thủ đô của Morocco (Ma-rốc) là Rabat (thường bị nhầm lẫn với Casablanca). Thành phố nằm ven Đại Tây Dương với nhiều công trình lịch sử cổ kính."]
  },
  {
    name: "tunisia",
    keywords: ["thủ đô tunisia", "thủ đô của tunisia"],
    responses: ["Thủ đô của Tunisia là Tunis. Thành phố nằm ở vịnh Tunis, gần di chỉ thành cổ Carthage nổi tiếng trong lịch sử."]
  },
  {
    name: "libya",
    keywords: ["thủ đô libya", "thủ đô của libya"],
    responses: ["Thủ đô của Libya là Tripoli. Thành phố cảng nằm ở tây bắc đất nước, bên bờ Địa Trung Hải."]
  },
  {
    name: "sudan",
    keywords: ["thủ đô sudan", "thủ đô của sudan"],
    responses: ["Thủ đô của Sudan là Khartoum. Thành phố nằm ngay giao điểm của hai nhánh sông Nile Trắng và Nile Xanh."]
  },
  {
    name: "nigeria",
    keywords: ["thủ đô nigeria", "thủ đô của nigeria"],
    responses: ["Thủ đô của Nigeria là Abuja (được xây dựng thay thế Lagos từ năm 1991). Đây là thành phố quy hoạch nằm ở trung tâm quốc gia."]
  },
  {
    name: "ghana",
    keywords: ["thủ đô ghana", "thủ đô của ghana"],
    responses: ["Thủ đô của Ghana là Accra. Đây là thành phố lớn nhất và là trung tâm kinh tế, hành chính của đất nước bên bờ vịnh Guinea."]
  },
  {
    name: "senegal",
    keywords: ["thủ đô senegal", "thủ đô của senegal"],
    responses: ["Thủ đô của Senegal là Dakar. Nằm trên bán đảo Cap-Vert, đây là cực tây của lục địa Châu Phi."]
  },
  {
    name: "ivory-coast",
    keywords: ["thủ đô bờ biển ngà", "thủ đô của bờ biển ngà"],
    responses: ["Thủ đô chính thức của Bờ Biển Ngà (Côte d'Ivoire) là Yamoussoukro, tuy nhiên Abidjan vẫn là trung tâm kinh tế và hành chính thực tế."]
  },
  {
    name: "cameroon",
    keywords: ["thủ đô cameroon", "thủ đô của cameroon"],
    responses: ["Thủ đô của Cameroon là Yaoundé. Thành phố nằm trên vùng đồi núi trung tâm, là thành phố lớn thứ hai đất nước sau Douala."]
  },
  {
    name: "mali",
    keywords: ["thủ đô mali", "thủ đô của mali"],
    responses: ["Thủ đô của Mali là Bamako. Nằm bên sông Niger, đây là một trong những thành phố có tốc độ phát triển nhanh nhất Châu Phi."]
  },
  {
    name: "niger",
    keywords: ["thủ đô niger", "thủ đô của niger"],
    responses: ["Thủ đô của Niger là Niamey. Đây là trung tâm hành chính, văn hóa và kinh tế lớn nhất của đất nước nằm trong vùng Tây Phi."]
  },
  {
    name: "burkina-faso",
    keywords: ["thủ đô burkina faso", "thủ đô của burkina faso"],
    responses: ["Thủ đô của Burkina Faso là Ouagadougou (thường gọi tắt là Ouaga). Đây là trung tâm văn hóa và kinh tế chính của quốc gia."]
  },
  {
    name: "guinea",
    keywords: ["thủ đô guinea", "thủ đô của guinea"],
    responses: ["Thủ đô của Guinea là Conakry. Thành phố cảng nằm bên bờ Đại Tây Dương, đóng vai trò là trung tâm kinh tế lớn nhất đất nước."]
  },
  {
    name: "benin",
    keywords: ["thủ đô benin", "thủ đô của benin"],
    responses: ["Thủ đô chính thức của Benin là Porto-Novo, nhưng Cotonou mới là nơi đặt trụ sở chính phủ và là thành phố lớn nhất."]
  },
  {
    name: "togo",
    keywords: ["thủ đô togo", "thủ đô của togo"],
    responses: ["Thủ đô của Togo là Lomé. Thành phố cảng nằm ở vịnh Guinea, là trung tâm công nghiệp và thương mại chính của nước này."]
  },
  {
    name: "sierra-leone",
    keywords: ["thủ đô sierra leone", "thủ đô của sierra leone"],
    responses: ["Thủ đô của Sierra Leone là Freetown. Thành phố cảng lớn nằm bên Đại Tây Dương, nổi tiếng với lịch sử giải phóng nô lệ."]
  },
  {
    name: "liberia",
    keywords: ["thủ đô liberia", "thủ đô của liberia"],
    responses: ["Thủ đô của Liberia là Monrovia. Đây là trung tâm tài chính và thương mại lớn nhất của quốc gia Tây Phi này."]
  },
  {
    name: "mauritania",
    keywords: ["thủ đô mauritania", "thủ đô của mauritania"],
    responses: ["Thủ đô của Mauritania là Nouakchott. Đây là một trong những thành phố lớn nhất vùng sa mạc Sahara."]
  },
  {
    name: "the-gambia",
    keywords: ["thủ đô gambia", "thủ đô của gambia"],
    responses: ["Thủ đô của Gambia là Banjul. Thành phố nằm trên đảo St Mary, nơi sông Gambia đổ ra Đại Tây Dương."]
  },
  {
    name: "cape-verde",
    keywords: ["thủ đô cape verde", "thủ đô của cape verde"],
    responses: ["Thủ đô của Cape Verde (Mũi Tên Xanh) là Praia. Thành phố nằm trên đảo Santiago thuộc quần đảo ngoài khơi Tây Phi."]
  },
  {
    name: "kenya",
    keywords: ["thủ đô kenya", "thủ đô của kenya"],
    responses: ["Thủ đô của Kenya là Nairobi. Thành phố nổi tiếng với Công viên Quốc gia Nairobi - khu bảo tồn thiên nhiên duy nhất nằm ngay sát một đô thị lớn."]
  },
  {
    name: "ethiopia",
    keywords: ["thủ đô ethiopia", "thủ đô của ethiopia"],
    responses: ["Thủ đô của Ethiopia là Addis Ababa. Đây được coi là 'Thủ đô chính trị của Châu Phi' do là nơi đặt trụ sở của Liên minh Châu Phi (AU)."]
  },
  {
    name: "tanzania",
    keywords: ["thủ đô tanzania", "thủ đô của tanzania"],
    responses: ["Thủ đô chính thức của Tanzania là Dodoma, tuy nhiên Dar es Salaam vẫn là thành phố lớn nhất và là trung tâm kinh tế chính."]
  },
  {
    name: "uganda",
    keywords: ["thủ đô uganda", "thủ đô của uganda"],
    responses: ["Thủ đô của Uganda là Kampala. Thành phố nằm ở vùng hồ lớn Châu Phi, gần hồ Victoria."]
  },
  {
    name: "rwanda",
    keywords: ["thủ đô rwanda", "thủ đô của rwanda"],
    responses: ["Thủ đô của Rwanda là Kigali. Thành phố nổi tiếng là một trong những đô thị sạch vẻ, an toàn và phát triển nhanh hàng đầu Châu Phi."]
  },
  {
    name: "madagascar",
    keywords: ["thủ đô madagascar", "thủ đô của madagascar"],
    responses: ["Thủ đô của Madagascar là Antananarivo. Thành phố nằm ở khu vực cao nguyên trung tâm của quốc đảo."]
  },
  {
    name: "somalia",
    keywords: ["thủ đô somalia", "thủ đô của somalia"],
    responses: ["Thủ đô của Somalia là Mogadishu. Thành phố cảng nằm ven Ấn Độ Dương, có lịch sử thương mại lâu đời."]
  },
  {
    name: "mozambique",
    keywords: ["thủ đô mozambique", "thủ đô của mozambique"],
    responses: ["Thủ đô của Mozambique là Maputo. Thành phố cảng nằm ở phía nam đất nước, bên vịnh Maputo."]
  },
  {
    name: "zambia",
    keywords: ["thủ đô zambia", "thủ đô của zambia"],
    responses: ["Thủ đô của Zambia là Lusaka. Thành phố nằm ở vùng cao nguyên phía nam, là trung tâm thương mại và chính trị của đất nước."]
  },
  {
    name: "zimbabwe",
    keywords: ["thủ đô zimbabwe", "thủ đô của zimbabwe"],
    responses: ["Thủ đô của Zimbabwe là Harare. Thành phố nằm ở vùng đông bắc quốc gia, là trung tâm công nghiệp và tài chính lớn."]
  },
  {
    name: "south-sudan",
    keywords: ["thủ đô nam sudan", "thủ đô của nam sudan"],
    responses: ["Thủ đô của Nam Sudan là Juba. Thành phố nằm bên bờ sông Nile Trắng, là thủ đô của quốc gia trẻ nhất thế giới."]
  },
  {
    name: "malawi",
    keywords: ["thủ đô malawi", "thủ đô của malawi"],
    responses: ["Thủ đô của Malawi là Lilongwe. Thành phố nằm ở trung tâm đất nước, gần biên giới với Mozambique và Zambia."]
  },
  {
    name: "burundi",
    keywords: ["thủ đô burundi", "thủ đô của burundi"],
    responses: ["Thủ đô chính trị của Burundi là Gitega (chuyển từ năm 2019), trong khi Bujumbura vẫn là thủ đô kinh tế."]
  },
  {
    name: "mauritius",
    keywords: ["thủ đô mauritius", "thủ đô của mauritius"],
    responses: ["Thủ đô của Mauritius là Port Louis. Thành phố cảng nằm bên Ấn Độ Dương, nổi tiếng với di sản kiến trúc đa dạng."]
  },
  {
    name: "djibouti",
    keywords: ["thủ đô djibouti", "thủ đô của djibouti"],
    responses: ["Thủ đô của Djibouti là Thành phố Djibouti (Djibouti City). Thành phố vị trí chiến lược nằm tại cửa ngõ Biển Đỏ."]
  },
  {
    name: "eritrea",
    keywords: ["thủ đô eritrea", "thủ đô of eritrea"],
    responses: ["Thủ đô của Eritrea là Asmara. Thành phố nằm trên cao nguyên, nổi tiếng với kiến trúc kiểu Ý thời thuộc địa."]
  },
  {
    name: "comoros",
    keywords: ["thủ đô comoros", "thủ đô của comoros"],
    responses: ["Thủ đô của Comoros là Moroni. Thành phố nằm trên đảo Grande Comore thuộc quần đảo ngoài khơi Đông Phí."]
  },
  {
    name: "seychelles",
    keywords: ["thủ đô seychelles", "thủ đô của seychelles"],
    responses: ["Thủ đô của Seychelles là Victoria. Đây là một trong những thủ đô nhỏ nhất thế giới, nằm trên đảo Mahé."]
  },
  {
    name: "dr-congo",
    keywords: ["thủ đô congo dân chủ", "thủ đô của dr congo", "thủ đô congo kim"],
    responses: ["Thủ đô của Cộng hòa Dân chủ Congo là Kinshasa. Nằm bên sông Congo, đây là siêu đô thị nói tiếng Pháp lớn nhất thế giới."]
  },
  {
    name: "congo",
    keywords: ["thủ đô congo", "thủ đô của congo"],
    responses: ["Thủ đô của Cộng hòa Congo (Congo-Brazzaville) là Brazzaville. Thành phố đối diện với Kinshasa qua sông Congo."]
  },
  {
    name: "angola",
    keywords: ["thủ đô angola", "thủ đô của angola"],
    responses: ["Thủ đô của Angola là Luanda. Thành phố cảng bên Đại Tây Dương này là trung tâm công nghiệp và kinh tế chính của Angola."]
  },
  {
    name: "gabon",
    keywords: ["thủ đô gabon", "thủ đô của gabon"],
    responses: ["Thủ đô của Gabon là Libreville. Thành phố cảng nằm ở phía bắc đất nước, gần vịnh Guinea."]
  },
  {
    name: "chad",
    keywords: ["thủ đô chad", "thủ đô của chad"],
    responses: ["Thủ đô của Chad (Sát) là N'Djamena. Thành phố nằm ở giao điểm của sông Chari và sông Logone."]
  },
  {
    name: "central-african-republic",
    keywords: ["thủ đô trung phi", "thủ đô của trung phi"],
    responses: ["Thủ đô của Cộng hòa Trung Phi là Bangui. Thành phố nằm ở miền nam nước này, bên bờ sông Ubangi."]
  },
  {
    name: "equatorial-guinea",
    keywords: ["thủ đô xích đạo guinea", "thủ đô của xích đạo guinea"],
    responses: ["Thủ đô hiện tại của Xích Đạo Guinea là Malabo (nằm trên đảo Bioko). Quốc gia này đang xây dựng thủ đô mới là Ciudad de la Paz trên đất liền."]
  },
  {
    name: "sao-tome-and-principe",
    keywords: ["thủ đô sao tome", "thủ đô của sao tome"],
    responses: ["Thủ đô của São Tomé và Príncipe là São Tomé. Thành phố nằm trên đảo São Tomé thuộc Vịnh Guinea."]
  },
  {
    name: "south-africa",
    keywords: ["thủ đô nam phi", "thủ đô của nam phi"],
    responses: ["Nam Phi có 3 thủ đô: Pretoria (thủ đô hành chính), Cape Town (thủ đô lập pháp) và Bloemfontein (thủ đô tư pháp)."]
  },
  {
    name: "namibia",
    keywords: ["thủ đô namibia", "thủ đô của namibia"],
    responses: ["Thủ đô của Namibia là Windhoek. Thành phố nằm ở vùng trung tâm cao nguyên của đất nước."]
  },
  {
    name: "botswana",
    keywords: ["thủ đô botswana", "thủ đô của botswana"],
    responses: ["Thủ đô của Botswana là Gaborone. Thành phố nằm ở phía đông nam đất nước, gần biên giới với Nam Phi."]
  },
  {
    name: "lesotho",
    keywords: ["thủ đô lesotho", "thủ đô của lesotho"],
    responses: ["Thủ đô của Lesotho là Maseru. Thành phố nằm ở biên giới phía tây, giáp ranh trực tiếp với Nam Phi."]
  },
  {
    name: "eswatini",
    keywords: ["thủ đô eswatini", "thủ đô swaziland", "thủ đô của eswatini"],
    responses: ["Thủ đô hành chính của Eswatini (Swaziland) là Mbabane, trong khi Lobamba là thủ đô hoàng gia và lập pháp."]
  },
{
    name: "usa",
    keywords: ["thủ đô mỹ", "thủ đô của mỹ", "thủ đô hoa kỳ"],
    responses: ["Thủ đô của Mỹ (Hoa Kỳ) là Washington, D.C. Đây là địa khu liên bang, nơi đặt trụ sở của toàn bộ chính quyền liên bang Mỹ (Nhà Trắng, Quốc hội, Tối cao Pháp viện)."]
  },
  {
    name: "canada",
    keywords: ["thủ đô canada", "thủ đô của canada"],
    responses: ["Thủ đô của Canada là Ottawa. Thành phố thuộc tỉnh Ontario, là trung tâm chính trị và hành chính của đất nước."]
  },
  {
    name: "mexico",
    keywords: ["thủ đô mexico", "thủ đô của mexico"],
    responses: ["Thủ đô của Mexico là Thành phố Mexico (Mexico City). Đây là một trong những trung tâm tài chính và văn hóa lớn nhất ở Tây Bán Cầu."]
  },
  {
    name: "guatemala",
    keywords: ["thủ đô guatemala", "thủ đô của guatemala"],
    responses: ["Thủ đô của Guatemala là Thành phố Guatemala (Guatemala City). Đây là thành phố đông dân nhất ở khu vực Trung Mỹ."]
  },
  {
    name: "belize",
    keywords: ["thủ đô belize", "thủ đô của belize"],
    responses: ["Thủ đô của Belize là Belmopan. Thành phố được xây dựng quy hoạch để làm thủ đô mới thay thế Belize City từ năm 1970."]
  },
  {
    name: "honduras",
    keywords: ["thủ đô honduras", "thủ đô của honduras"],
    responses: ["Thủ đô của Honduras là Tegucigalpa (thường gọi tắt là Tegus). Thành phố nằm ở khu vực cao nguyên phía nam đất nước."]
  },
  {
    name: "el-salvador",
    keywords: ["thủ đô el salvador", "thủ đô của el salvador"],
    responses: ["Thủ đô của El Salvador là San Salvador. Thành phố nằm dưới chân núi lửa San Salvador, là trung tâm tài chính lớn của quốc gia."]
  },
  {
    name: "nicaragua",
    keywords: ["thủ đô nicaragua", "thủ đô của nicaragua"],
    responses: ["Thủ đô của Nicaragua là Managua. Thành phố nằm bên bờ phía nam của hồ Managua."]
  },
  {
    name: "costa-rica",
    keywords: ["thủ đô costa rica", "thủ đô của costa rica"],
    responses: ["Thủ đô của Costa Rica là San José. Thành phố nằm ở Thung lũng Trung tâm, là trụ sở chính quyền và trung tâm kinh tế của nước này."]
  },
  {
    name: "panama",
    keywords: ["thủ đô panama", "thủ đô của panama"],
    responses: ["Thủ đô của Panama là Thành phố Panama (Panama City). Thành phố nằm ở cửa ngõ phía Thái Bình Dương của kênh đào Panama."]
  },
  {
    name: "cuba",
    keywords: ["thủ đô cuba", "thủ đô của cuba"],
    responses: ["Thủ đô của Cuba là Havana (La Habana). Thành phố cổ kính nằm ở bờ biển phía bắc, nổi tiếng với kiến trúc lịch sử và ô tô cổ."]
  },
  {
    name: "haiti",
    keywords: ["thủ đô haiti", "thủ đô của haiti"],
    responses: ["Thủ đô của Haiti là Port-au-Prince. Thành phố nằm trên vịnh Gonâve, là trung tâm kinh tế và thương mại lớn nhất nước này."]
  },
  {
    name: "dominican-republic",
    keywords: ["thủ đô cộng hòa dominica", "thủ đô của cộng hòa dominica"],
    responses: ["Thủ đô của Cộng hòa Dominica là Santo Domingo. Đây là đô thị lâu đời nhất do người châu Âu xây dựng tại Châu Mỹ."]
  },
  {
    name: "jamaica",
    keywords: ["thủ đô jamaica", "thủ đô của jamaica"],
    responses: ["Thủ đô của Jamaica là Kingston. Thành phố nằm ở bờ biển phía đông nam quốc đảo, là trung tâm văn hóa và âm nhạc Reggae."]
  },
  {
    name: "bahamas",
    keywords: ["thủ đô bahamas", "thủ đô của bahamas"],
    responses: ["Thủ đô của Bahamas là Nassau. Thành phố nằm trên đảo New Providence, nổi tiếng với du lịch nghỉ dưỡng và các bãi biển đẹp."]
  },
  {
    name: "trinidad-and-tobago",
    keywords: ["thủ đô trinidad và tobago", "thủ đô của trinidad và tobago"],
    responses: ["Thủ đô của Trinidad và Tobago là Port of Spain. Thành phố nằm trên vịnh Paria thuộc đảo Trinidad."]
  },
  {
    name: "barbados",
    keywords: ["thủ đô barbados", "thủ đô của barbados"],
    responses: ["Thủ đô của Barbados là Bridgetown. Thành phố cảng nằm ở tây nam quốc đảo, sở hữu khu phố cổ được UNESCO công nhận."]
  },
  {
    name: "saint-lucia",
    keywords: ["thủ đô saint lucia", "thủ đô của saint lucia"],
    responses: ["Thủ đô của Saint Lucia là Castries. Thành phố cảng quan trọng nằm ở bờ biển phía tây bắc đảo quốc."]
  },
  {
    name: "grenada",
    keywords: ["thủ đô grenada", "thủ đô của grenada"],
    responses: ["Thủ đô của Grenada là St. George's. Thành phố cảng xinh đẹp được bao quanh bởi một miệng núi lửa cổ đã qua sử dụng."]
  },
  {
    name: "antigua-and-barbuda",
    keywords: ["thủ đô antigua và barbuda", "thủ đô của antigua và barbuda"],
    responses: ["Thủ đô của Antigua và Barbuda là St. John's. Thành phố nằm trên đảo Antigua, là thương cảng chính của đất nước."]
  },
  {
    name: "saint-vincent-and-the-grenadines",
    keywords: ["thủ đô saint vincent", "thủ đô của saint vincent"],
    responses: ["Thủ đô của Saint Vincent và Grenadines là Kingstown. Thành phố cảng nổi tiếng với các khu vườn bách thảo lâu đời."]
  },
  {
    name: "saint-kitts-and-nevis",
    keywords: ["thủ đô saint kitts và nevis", "thủ đô của saint kitts và nevis"],
    responses: ["Thủ đô của Saint Kitts và Nevis là Basseterre. Thành phố nằm trên đảo Saint Kitts, là một trong những trung tâm thương mại cổ ở Tây Ấn."]
  },
  {
    name: "dominica",
    keywords: ["thủ đô dominica", "thủ đô của dominica"],
    responses: ["Thủ đô của Dominica là Roseau. Thành phố nằm ở bờ biển phía tây nam của quốc đảo Caribe này."]
  },
  {
    name: "brazil",
    keywords: ["thủ đô brazil", "thủ đô của brazil"],
    responses: ["Thủ đô của Brazil là Brasília (thường bị nhầm lẫn với Rio de Janeiro hay São Paulo). Thành phố được quy hoạch theo hình dáng chiếc máy bay."]
  },
  {
    name: "argentina",
    keywords: ["thủ đô argentina", "thủ đô của argentina"],
    responses: ["Thủ đô của Argentina là Buenos Aires. Thành phố nằm bên bờ cửa sông Río de la Plata, nổi tiếng với văn hóa Tango."]
  },
  {
    name: "colombia",
    keywords: ["thủ đô colombia", "thủ đô của colombia"],
    responses: ["Thủ đô của Colombia là Bogotá. Thành phố nằm trên đồi cao thuộc dãy Andes, là trung tâm chính trị và công nghiệp lớn."]
  },
  {
    name: "chile",
    keywords: ["thủ đô chile", "thủ đô của chile"],
    responses: ["Thủ đô của Chile là Santiago (Santiago de Chile). Thành phố nằm ở thung lũng trung tâm, được bao bọc bởi dãy Andes hùng vĩ."]
  },
  {
    name: "peru",
    keywords: ["thủ đô peru", "thủ đô của peru"],
    responses: ["Thủ đô của Peru là Lima. Thành phố nằm ven Thái Bình Dương, nổi tiếng với lịch sử thời thuộc địa Tây Ban Nha và ẩm thực độc đáo."]
  },
  {
    name: "venezuela",
    keywords: ["thủ đô venezuela", "thủ đô của venezuela"],
    responses: ["Thủ đô của Venezuela là Caracas. Thành phố nằm ở thung lũng phía bắc, cách biển Caribe một dãy núi ngắn."]
  },
  {
    name: "ecuador",
    keywords: ["thủ đô ecuador", "thủ đô của ecuador"],
    responses: ["Thủ đô của Ecuador là Quito. Đây là thủ đô nằm ở độ cao cao thứ hai trên thế giới (2.850m) và rất gần đường xích đạo."]
  },
  {
    name: "bolivia",
    keywords: ["thủ đô bolivia", "thủ đô của bolivia"],
    responses: ["Bolivia có 2 thủ đô: Sucre là thủ đô hiến pháp và tư pháp, trong khi La Paz là trụ sở chính phủ và cơ quan lập pháp thực tế."]
  },
  {
    name: "paraguay",
    keywords: ["thủ đô paraguay", "thủ đô của paraguay"],
    responses: ["Thủ đô của Paraguay là Asunción. Thành phố nằm bên bờ sông Paraguay, là một trong những đô thị lâu đời nhất ở Nam Mỹ."]
  },
  {
    name: "uruguay",
    keywords: ["thủ đô uruguay", "thủ đô của uruguay"],
    responses: ["Thủ đô của Uruguay là Montevideo. Thành phố nằm ở bờ phía nam đất nước, sở hữu chất lượng cuộc sống hàng đầu khu vực Nam Mỹ."]
  },
  {
    name: "guyana",
    keywords: ["thủ đô guyana", "thủ đô của guyana"],
    responses: ["Thủ đô của Guyana là Georgetown. Thành phố cảng nằm bên bờ Đại Tây Dương, nổi tiếng với kiến trúc gỗ thời thuộc địa Anh."]
  },
  {
    name: "suriname",
    keywords: ["thủ đô suriname", "thủ đô của suriname"],
    responses: ["Thủ đô của Suriname là Paramaribo. Thành phố nằm bên sông Suriname, có trung tâm lịch sử được UNESCO công nhận di sản thế giới."]
  },
  {
    name: "australia",
    keywords: ["thủ đô úc", "thủ đô của úc", "thủ đô australia"],
    responses: ["Thủ đô của Úc (Australia) là Canberra. Thành phố được xây dựng quy hoạch riêng làm thủ đô nhằm giải quyết tranh chấp vị thế giữa Sydney và Melbourne."]
  },
  {
    name: "new-zealand",
    keywords: ["thủ đô new zealand", "thủ đô của new zealand"],
    responses: ["Thủ đô của New Zealand là Wellington. Đây là thủ đô nằm xa nhất về phía nam của một quốc gia có chủ quyền trên thế giới."]
  },
  {
    name: "papua-new-guinea",
    keywords: ["thủ đô papua new guinea", "thủ đô của papua new guinea"],
    responses: ["Thủ đô của Papua New Guinea là Port Moresby. Thành phố cảng nằm bên vịnh Papua, là trung tâm kinh tế và thương mại lớn nhất nước."]
  },
  {
    name: "fiji",
    keywords: ["thủ đô fiji", "thủ đô của fiji"],
    responses: ["Thủ đô của Fiji là Suva. Thành phố nằm ở bờ biển phía đông nam đảo Viti Levu, là trung tâm thương mại và chính trị của quốc đảo."]
  },
  {
    name: "solomon-islands",
    keywords: ["thủ đô quần đảo solomon", "thủ đô của quần đảo solomon"],
    responses: ["Thủ đô của Quần đảo Solomon là Honiara. Thành phố nằm trên đảo Guadalcanal, đóng vai trò là trung tâm hành chính chính."]
  },
  {
    name: "vanuatu",
    keywords: ["thủ đô vanuatu", "thủ đô của vanuatu"],
    responses: ["Thủ đô của Vanuatu là Port Vila. Thành phố nằm ở bờ biển phía tây nam của đảo Efate, nổi tiếng với ngành du lịch và thương mại cảng."]
  },
  {
    name: "micronesia",
    keywords: ["thủ đô micronesia", "thủ đô của micronesia"],
    responses: ["Thủ đô của Liên bang Micronesia là Palikir. Thành phố nằm trên đảo Pohnpei, thay thế Kolonia làm thủ đô từ năm 1989."]
  },
  {
    name: "kiribati",
    keywords: ["thủ đô kiribati", "thủ đô của kiribati"],
    responses: ["Thủ đô của Kiribati là Nam Tarawa (South Tarawa). Đây là một chuỗi các đảo san hô vòng bao gồm nhiều islets tại thái bình dương."]
  },
  {
    name: "marshall-islands",
    keywords: ["thủ đô quần đảo marshall", "thủ đô của quần đảo marshall"],
    responses: ["Thủ đô của Quần đảo Marshall là Majuro. Thành phố nằm trên một rạn san hô vòng bao gồm 64 hòn đảo nhỏ hợp thành."]
  },
  {
    name: "palau",
    keywords: ["thủ đô palau", "thủ đô của palau"],
    responses: ["Thủ đô của Palau là Ngerulmud. Thành phố được chọn làm thủ đô mới từ năm 2006 để thay thế Koror."]
  },
  {
    name: "nauru",
    keywords: ["thủ đô nauru", "thủ đô của nauru"],
    responses: ["Nauru không có thủ đô chính thức theo pháp lý, nhưng Yaren đóng vai trò là trung tâm hành chính thực tế (nơi đặt các cơ quan chính phủ)."]
  },
  {
    name: "samoa",
    keywords: ["thủ đô samoa", "thủ đô của samoa"],
    responses: ["Thủ đô của Samoa là Apia. Thành phố nằm ở bờ biển phía bắc đảo Upolu, là cảng biển và trung tâm kinh tế duy nhất của đất nước."]
  },
  {
    name: "tonga",
    keywords: ["thủ đô tonga", "thủ đô của tonga"],
    responses: ["Thủ đô của Vương quốc Tonga là Nukuʻalofa. Thành phố nằm ở bờ biển phía bắc của đảo Tongatapu."]
  },
  {
    name: "tuvalu",
    keywords: ["thủ đô tuvalu", "thủ đô của tuvalu"],
    responses: ["Thủ đô của Tuvalu là Funafuti. Đây là một đảo san hô vòng bao gồm nhiều hòn đảo nhỏ bao quanh một đầm phá lớn."]
  },
            {
                name: "economy",
                keywords: ["tiền", "lạm phát", "làm giàu", "nợ", "nghèo", "kinh tế", "giá", "kiếm tiền", "giàu"],
                handler: () => this.getEconomicAdvice()
            },
            {
                name: "farming",
                keywords: ["trồng", "lúa", "gieo", "hạt giống", "ruộng", "nông dân", "thu hoạch"],
                handler: () => this.getFarmingAdvice()
            },
            {
                name: "night",
                keywords: ["đêm", "ma", "ông ba đồng", "quái", "mất máu", "quái vật", "nguy hiểm"],
                responses: [
                    "⚠ ÔNG BA ĐỒNG SẼ LÀM GÌ ĐÓ VỚI BẠN",
                    "Né ÔNG BA ĐỒNG ra xa"
                ]
            },
            {
                name: "npc",
                keywords: ["npc", "ông bảy", "tám đen", "kiều my", "bách hóa", "phóng viên", "công an", "bảo gay", "tư đô"],
                handler: text => this.getNPCInfo(text)
            },
            {
                name: "music",
                keywords: ["nhạc", "băng đĩa", "hộp nhạc", "nhạc nền", "bài hát", "nghe nhạc"],
                responses: [
                    "🎵 Bạn có thể ghé Cửa hàng Băng Đĩa Nhạc của Ông Năm hoặc tương tác với Hộp Nhạc Gỗ."
                ]
            },
            {
                name: "achievement",
                keywords: ["thành tựu", "danh hiệu", "nhiệm vụ", "thưởng", "achievement"],
                responses: [
                    "🏆 Có các thành tựu như Tỷ Phú Xã Nghèo, Hoàn Lương Hết Nợ, Bậc Thầy Về Cá và Chào Ngày Thứ 2."
                ]
            },
            {
                name: "status",
                keywords: ["trạng thái", "tài sản", "inventory", "kho đồ", "tôi có gì", "tôi đang có gì", "thông tin của tôi"],
                handler: () => this.getGameStateSummary()
            },
            {
                name: "praise",
                keywords: ["giỏi", "xịn", "hay", "thông minh", "cảm ơn", "thanks","thank", "ok", "tuyệt"],
                responses: [
                    "😎 Cảm ơn bro! Tôi đang cố bớt ngu hơn bản 0.01.",
                    "Haha cảm ơn! Cứ hỏi tiếp, tôi còn đang học cách hiểu bro."
                ]
            },
{ name: "bien",
keywords:["biển lại mặn","biển mặn"],
responses: ["VÌ CÓ MUỐI"]},
{ name: "muoi",
keywords:["có muối"],
responses: ["MUỐI Được sinh ra theo kiểu: Nước mưa hòa tan một lượng rất nhỏ khoáng chất từ đá và đất sau đó sông mang các ion như natri (Na⁺) và clorua (Cl⁻) ra biển rồi Khi nước biển bốc hơi, nước bay lên nhưng muối ở lại quá trình này diễn ra hàng trăm triệu năm nên muối ngày càng tích tụ.Ngoài ra còn có: Núi lửa dưới đáy biển,các miệng phun thủy nhiệt dưới đại dương cũng bổ sung khoáng chất. Vậy thôi"]},
{name: "ho_den",
keywords: ["hố đen", "lỗ đen", "ho den", "lo den"],
responses: [
`Hố đen là vùng không-thời gian bị biến dạng cực đại do khối lượng bị nén quá nhỏ, tạo lực hấp dẫn mạnh đến mức không vật chất hay ánh sáng nào thoát ra được.
Cấu trúc: Gồm điểm kỳ dị (tâm mật độ vô hạn), chân trời sự kiện (ranh giới không thể quay đầu) và đĩa bồi tụ (vật chất xoay quanh phát sáng)
Định luật cốt lõi:
Tương đối tổng quát: Khối lượng làm cong không-thời gian.
Bán kính Schwarzschild: Công thức tính kích thước chân trời sự kiện (Rₛ=2GM/c²)
Định lý No-Hair: Hố đen chỉ được mô tả bởi Khối lượng, Điện tích và Momen động lượng.
Nhiệt động lực học & Bức xạ Hawking:
Hố đen có nhiệt độ, diện tích ranh giới không giảm và có thể "bốc hơi" chậm theo thời gian.
Hiện tượng giãn nở thời gian: Thời gian trôi chậm dần khi tiến gần chân trời sự kiện (dưới góc nhìn của người quan sát ở xa, vật thể rơi vào sẽ như bị "đóng băng" tại ranh giới)
Phân loại: Gồm 4 dạng chính: Nguyên thủy (giả thuyết), Khối lượng sao (3-100M☉), Khối lượng trung bình (100-10^5 M☉) và Siêu khối lượng (>10⁵ M☉).
(/chú thích M☉ đọc là khối lượng mặt trời, 1M☉ xắp xỉ 1,989×10³⁰ kg)
Phương pháp phát hiện & chụp ảnh: Phát hiện gián tiếp qua chuyển động sao lân cận, bức xạ tia X, thấu kính hấp dẫn, sóng hấp dẫn (LIGO); chụp ảnh "bóng" hố đen bằng mạng lưới kính thiên văn vô tuyến liên lục địa (kỹ thuật VLBI của dự án EHT).ừm thì sao`
]},
{
    name: "element_actinium",
    keywords: ["actinium", "actini", "nguyên tố ac", "z=89"],
    responses: [
        "🧪 ACTINI (Ac) - Z: 89 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 227 amu - e: [Rn] 6d1 7s2. Tính chất hóa học: Kim loại tính kiềm và phản ứng mạnh với oxy, nước, axit tạo Ac3+. Công dụng: Nghiên cứu khoa học, nguồn phát tia alpha trong y học. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ mạnh, tích tụ trong xương gây ung thư."
    ]
},
{
    name: "element_aluminum",
    keywords: ["nhôm", "aluminum", "aluminium", "nguyên tố al", "z=13"],
    responses: [
        "🧪 NHÔM (Al) - Z: 13 - Chu kỳ: 3 - Nhóm: IIIA (13) - Khối lượng: 26.982 amu - e: [Ne] 3s2 3p1. Tính chất hóa học: Lưỡng tính, phản ứng với cả axit và kiềm, bị thụ động hóa trong HNO3 đặc nguội. Công dụng: Chế tạo máy bay, cửa nhôm, lon nước, đồ gia dụng. Nguy hiểm: AN TOÀN ở dạng kim loại, nhưng bụi nhôm dễ gây nổ và hít phải bụi nhôm hại phổi."
    ]
},
{
    name: "element_americium",
    keywords: ["americium", "americi", "nguyên tố am", "z=95"],
    responses: [
        "🧪 AMERICI (Am) - Z: 95 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 243 amu - e: [Rn] 5f7 7s2. Tính chất hóa học: Kim loại phản ứng tạo hỗn hợp oxit Am2O3 và AmO2. Công dụng: Dùng trong thiết bị báo khói, nguồn tia gamma nghiên cứu. Nguy hiểm: CỰC KỲ NGUY HIỂM do là nguyên tố phóng xạ nhân tạo, phát tia alpha và gamma."
    ]
},
{
    name: "element_antimony",
    keywords: ["antimon", "antimony", "stibium", "nguyên tố sb", "z=51"],
    responses: [
        "🧪 ANTIMON (Sb) - Z: 51 - Chu kỳ: 5 - Nhóm: VA (15) - Khối lượng: 121.76 amu - e: [Kr] 4d10 5s2 5p3. Tính chất hóa học: Á kim tính khống, phản ứng với halogen và axit oxy hóa. Công dụng: Làm chất chống cháy, hợp kim ắc quy, bán dẫn. Nguy hiểm: NGUY HIỂM, độc hại tương tự Asen, gây ngộ độc và tổn thương tim gan."
    ]
},
{
    name: "element_argon",
    keywords: ["argon", "nguyên tố ar", "z=18"],
    responses: [
        "🧪 ARGON (Ar) - Z: 18 - Chu kỳ: 3 - Nhóm: VIIIA (18) - Khối lượng: 39.948 amu - e: [Ne] 3s2 3p6. Tính chất hóa học: Khí hiếm cực kỳ trơ, gần như không phản ứng với chất nào. Công dụng: Bơm bóng đèn, tạo môi trường trơ hàn kim loại, chế tạo bán dẫn. Nguy hiểm: AN TOÀN khi bình thường, nhưng có thể gây ngạt thở nếu chiếm hết oxy trong phòng."
    ]
},
{
    name: "element_arsenic",
    keywords: ["asen", "arsenic", "thạch tín", "nguyên tố as", "z=33"],
    responses: [
        "🧪 ASEN (As) - Z: 33 - Chu kỳ: 4 - Nhóm: VA (15) - Khối lượng: 74.922 amu - e: [Ar] 3d10 4s2 4p3. Tính chất hóa học: Á kim, tạo oxit lưỡng tính As2O3 (thạch tín), phản ứng với phi kim và kim loại. Công dụng: Thuốc trừ sâu, linh kiện bán dẫn GaAs. Nguy hiểm: CỰC KỲ ĐỘC HẠI (Thạch tín), gây ung thư và tử vong nhanh chóng nếu nuốt phải."
    ]
},
{
    name: "element_astatine",
    keywords: ["astatin", "astatine", "nguyên tố at", "z=85"],
    responses: [
        "🧪 ASTATIN (At) - Z: 85 - Chu kỳ: 6 - Nhóm: VIIA (17) - Khối lượng: 210 amu - e: [Xe] 4f14 5d10 6s2 6p5. Tính chất hóa học: Halogen nặng nhất, tính oxy hóa yếu hơn Iốt, có tính kim loại nhẹ. Công dụng: Nghiên cứu điều trị ung thư bằng tia alpha. Nguy hiểm: CỰC KỲ NGUY HIỂM do là nguyên tố phóng xạ cực hiếm, phát xạ tia alpha liều mạnh."
    ]
},
{
    name: "element_barium",
    keywords: ["bari", "barium", "nguyên tố ba", "z=56"],
    responses: [
        "🧪 BARI (Ba) - Z: 56 - Chu kỳ: 6 - Nhóm: IIA (2) - Khối lượng: 137.33 amu - e: [Xe] 6s2. Tính chất hóa học: Kim loại kiềm thổ tính khử mạnh, phản ứng kịch liệt với nước tạo Ba(OH)2 và H2. Công dụng: Dùng trong khoan dầu khí, tạo màu xanh lá trong pháo hoa, chụp X-quang ruột (BaSO4). Nguy hiểm: NGUY HIỂM, các muối Bari tan đều rất độc cho tim và hệ thần kinh."
    ]
},
{
    name: "element_berkelium",
    keywords: ["berkelium", "berkeli", "nguyên tố bk", "z=97"],
    responses: [
        "🧪 BERKELI (Bk) - Z: 97 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 247 amu - e: [Rn] 5f9 7s2. Tính chất hóa học: Kim loại phản ứng, dễ bị oxy hóa tạo Bk3+ và Bk4+. Công dụng: Duy nhất dùng nghiên cứu khoa học tổng hợp nguyên tố nặng hơn. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ cao và tích tụ trong xương."
    ]
},
{
    name: "element_beryllium",
    keywords: ["beri", "beryllium", "nguyên tố be", "z=4"],
    responses: [
        "🧪 BERI (Be) - Z: 4 - Chu kỳ: 2 - Nhóm: IIA (2) - Khối lượng: 9.0122 amu - e: 1s2 2s2. Tính chất hóa học: Kim loại kiềm thổ nhưng tạo hợp chất cộng hóa trị, lưỡng tính. Công dụng: Linh kiện máy bay, vệ tinh, nguyên tử giảm tốc trong lò phản ứng. Nguy hiểm: CỰC KỲ ĐỘC HẠI, hít phải bụi Beri gây bệnh Berylliosis phổi và ung thư."
    ]
},
{
    name: "element_bismuth",
    keywords: ["bismut", "bismuth", "nguyên tố bi", "z=83"],
    responses: [
        "🧪 BISMUT (Bi) - Z: 83 - Chu kỳ: 6 - Nhóm: VA (15) - Khối lượng: 208.98 amu - e: [Xe] 4f14 5d10 6s2 6p3. Tính chất hóa học: Kim loại yếu, ít phản ứng ở nhiệt độ thường, tạo oxit Bi2O3 khi đốt nóng. Công dụng: Thuốc đau dạ dày (Pepto-Bismol), pháo hoa, hợp kim chống cháy. Nguy hiểm: AN TOÀN TƯƠNG ĐỐI, là kim loại nặng ít độc nhất trong bảng tuần hoàn."
    ]
},
{
    name: "element_bohrium",
    keywords: ["bohrium", "bohri", "nguyên tố bh", "z=107"],
    responses: [
        "🧪 BOHRI (Bh) - Z: 107 - Chu kỳ: 7 - Nhóm: VIIB (7) - Khối lượng: 270 amu - e: [Rn] 5f14 6d5 7s2. Tính chất hóa học: Kim loại chuyển tiếp tổng hợp, dự đoán có tính chất tương tự Mangan. Công dụng: Duy nhất nghiên cứu khoa học. Nguy hiểm: CỰC KỲ NGUY HIỂM do phóng xạ cực mạnh, chu kỳ bán rã chỉ vài giây."
    ]
},
{
    name: "element_boron",
    keywords: ["bo", "boron", "nguyên tố b", "z=5"],
    responses: [
        "🧪 BO (B) - Z: 5 - Chu kỳ: 2 - Nhóm: IIA (13) - Khối lượng: 10.81 amu - e: 1s2 2s2 2p1. Tính chất hóa học: Á kim, phản ứng với phi kim ở nhiệt độ cao, tạo axit B(OH)3 lưỡng tính. Công dụng: Thủy tinh chịu nhiệt Pyrex, gốm sứ, giáp chống đạn, phân bón. Nguy hiểm: AN TOÀN TƯƠNG ĐỐI, liều cao axit boric có thể gây ngộ độc nhẹ."
    ]
},
{
    name: "element_bromine",
    keywords: ["brom", "bromine", "nguyên tố br", "z=35"],
    responses: [
        "🧪 BROM (Br) - Z: 35 - Chu kỳ: 4 - Nhóm: VIIA (17) - Khối lượng: 79.904 amu - e: [Ar] 3d10 4s2 4p5. Tính chất hóa học: Halogen tính oxy hóa mạnh, phản ứng với kim loại tạo muối Bromua và nước tạo HBr. Công dụng: Chất chống cháy, thuốc nhuộm, dược phẩm, làm phim ảnh. Nguy hiểm: CỰC KỲ ĐỘC HẠI, dạng chất lỏng gây bỏng hóa học nặng, hơi brom ăn mòn và hỏng phổi."
    ]
},
{
    name: "element_cadmium",
    keywords: ["cadimi", "cadmium", "nguyên tố cd", "z=48"],
    responses: [
        "🧪 CADIMI (Cd) - Z: 48 - Chu kỳ: 5 - Nhóm: IIB (12) - Khối lượng: 112.41 amu - e: [Kr] 4d10 5s2. Tính chất hóa học: Kim loại chuyển tiếp mềm, phản ứng với axit giải phóng Hydro. Công dụng: Chế tạo pin Ni-Cd, mạ chống gỉ, chất ổn định nhựa. Nguy hiểm: CỰC KỲ ĐỘC HẠI, gây suy thận, đau xương và là chất gây ung thư."
    ]
},
{
    name: "element_calcium",
    keywords: ["canxi", "calcium", "nguyên tố ca", "z=20"],
    responses: [
        "🧪 CANXI (Ca) - Z: 20 - Chu kỳ: 4 - Nhóm: IIA (2) - Khối lượng: 40.078 amu - e: [Ar] 4s2. Tính chất hóa học: Kim loại kiềm thổ khử mạnh, tác dụng với nước tạo Ca(OH)2 và khí H2. Công dụng: Xi măng, vôi xây dựng, cấu tạo xương răng, chế biến thực phẩm. Nguy hiểm: AN TOÀN ở dạng hợp chất, nhưng kim loại Canxi nguyên chất phản ứng mạnh gây giật nổ khi gặp nước."
    ]
},
{
    name: "element_californium",
    keywords: ["californium", "californi", "nguyên tố cf", "z=98"],
    responses: [
        "🧪 CALIFORNIU (Cf) - Z: 98 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 251 amu - e: [Rn] 5f10 7s2. Tính chất hóa học: Kim loại phóng xạ tổng hợp, dễ bị oxy hóa bởi không khí. Công dụng: Nguồn phát neutron khởi động lò phản ứng hạt nhân, điều trị ung thư. Nguy hiểm: CỰC KỲ NGUY HIEM, phát xạ neutron mạnh gây tổn thương tế bào và ung thư."
    ]
},
{
    name: "element_carbon",
    keywords: ["cacbon", "carbon", "nguyên tố c", "z=6"],
    responses: [
        "🧪 CACBON (C) - Z: 6 - Chu kỳ: 2 - Nhóm: IVA (14) - Khối lượng: 12.011 amu - e: 1s2 2s2 2p2. Tính chất hóa học: Phi kim đa dạng, tính khử ở nhiệt độ cao, tạo nền tảng cho hóa học hữu cơ. Công dụng: Năng lượng (than đá), trang sức (kim cương), lõi bút chì (than chì), lọc nước. Nguy hiểm: AN TOÀN ở dạng nguyên tố, nhưng hợp chất CO (Cacbon Monoxit) cực kỳ độc gây ngạt tử vong."
    ]
},
{
    name: "element_cerium",
    keywords: ["ceri", "cerium", "nguyên tố ce", "z=58"],
    responses: [
        "🧪 CERI (Ce) - Z: 58 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 140.12 amu - e: [Xe] 4f1 5d1 6s2. Tính chất hóa học: Kim loại đất hiếm, tính khử mạnh, có các trạng thái oxy hóa +3 và +4. Công dụng: Đá lửa máy quẹt, chất xúc tác trong luyện kim, kính màu. Nguy hiểm: ĐỘC NHẸ, bụi Ceri dễ cháy nổ trong không khí."
    ]
},
{
    name: "element_cesium",
    keywords: ["xesi", "cesium", "caesium", "nguyên tố cs", "z=55"],
    responses: [
        "🧪 XESI (Cs) - Z: 55 - Chu kỳ: 6 - Nhóm: IA (1) - Khối lượng: 132.91 amu - e: [Xe] 6s1. Tính chất hóa học: Kim loại kiềm mạnh nhất, phản ứng nổ mãnh liệt với nước ngay cả ở -116 độ C. Công dụng: Đồng hồ nguyên tử siêu chính xác, chất khoan dầu khí. Nguy hiểm: CỰC KỲ NGUY HIỂM, gây nổ cực mạnh khi chạm nước hoặc không khí ẩm, gây bỏng nhiệt nặng."
    ]
},
{
    name: "element_chlorine",
    keywords: ["clo", "chlorine", "nguyên tố cl", "z=17"],
    responses: [
        "🧪 CLO (Cl) - Z: 17 - Chu kỳ: 3 - Nhóm: VIIA (17) - Khối lượng: 35.45 amu - e: [Ne] 3s2 3p5. Tính chất hóa học: Halogen tính oxy hóa rất mạnh, tác dụng hầu hết kim loại tạo muối Clorua. Công dụng: Khử trùng nước sinh hoạt, sản xuất nhựa PVC, chất tẩy rửa. Nguy hiểm: ĐỘC HẠI, khí Clo hít phải gây phá hủy hệ hô hấp, tổn thương phổi nặng."
    ]
},
{
    name: "element_chromium",
    keywords: ["crom", "chromium", "nguyên tố cr", "z=24"],
    responses: [
        "🧪 CROM (Cr) - Z: 24 - Chu kỳ: 4 - Nhóm: VIB (6) - Khối lượng: 51.996 amu - e: [Ar] 3d5 4s1. Tính chất hóa học: Kim loại chuyển tiếp, có màng oxit bảo vệ bền vững, hợp chất Cr6+ có tính oxy hóa mạnh. Công dụng: Mạ bóng chống gỉ, sản xuất thép không gỉ (Inox), tạo màu sơn. Nguy hiểm: Crom kim loại an toàn, nhưng hợp chất Crom 6+ CỰC KỲ ĐỘC HẠI và gây ung thư."
    ]
},
{
    name: "element_cobalt",
    keywords: ["coban", "cobalt", "nguyên tố co", "z=27"],
    responses: [
        "🧪 COBAN (Co) - Z: 27 - Chu kỳ: 4 - Nhóm: VIII (9) - Khối lượng: 58.933 amu - e: [Ar] 3d7 4s2. Tính chất hóa học: Kim loại chuyển tiếp từ tính, bị tan chậm trong axit loãng. Công dụng: Hợp kim chịu nhiệt, pin xe điện, tạo màu xanh coban cho gốm sứ. Nguy hiểm: ĐỘC HẠI MỨC TRUNG BÌNH, hít phải bụi Coban gây dị ứng phổi, Coban-60 là chất phóng xạ nguy hiểm."
    ]
},
{
    name: "element_copernicium",
    keywords: ["copernicium", "nguyên tố cn", "z=112"],
    responses: [
        "🧪 COPERNICIUM (Cn) - Z: 112 - Chu kỳ: 7 - Nhóm: IIB (12) - Khối lượng: 285 amu - e: [Rn] 5f14 6d10 7s2. Tính chất hóa học: Kim loại phóng xạ siêu nặng, dự đoán có đặc tính giống thủy ngân nhưng dễ bay hơi hơn. Công dụng: Chỉ dùng trong nghiên cứu phòng thí nghiệm. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã phóng xạ cực nhanh."
    ]
},
{
    name: "element_copper",
    keywords: ["đồng", "copper", "cuprum", "nguyên tố cu", "z=29"],
    responses: [
        "🧪 ĐỒNG (Cu) - Z: 29 - Chu kỳ: 4 - Nhóm: IB (11) - Khối lượng: 63.546 amu - e: [Ar] 3d10 4s1. Tính chất hóa học: Kim loại kém hoạt động, không tan trong axit loãng, tan trong axit có tính oxy hóa (HNO3). Công dụng: Dây dẫn điện, ống dẫn nước, đồng thau, đồ mỹ nghệ. Nguy hiểm: AN TOÀN khi dùng làm đồ gia dụng, nhưng nuốt phải lượng lớn muối Đồng gây ngộ độc gan thận."
    ]
},
{
    name: "element_curium",
    keywords: ["curium", "curi", "nguyên tố cm", "z=96"],
    responses: [
        "🧪 CURIUM (Cm) - Z: 96 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 247 amu - e: [Rn] 5f7 6d1 7s2. Tính chất hóa học: Kim loại phóng xạ nhân tạo, tự phát nhiệt mạnh do phân rã phóng xạ. Công dụng: Cung cấp điện năng cho các thiết bị vũ trụ du hành xa Trái Đất. Nguy hiểm: CỰC KỲ NGUY HIỂM, phát bức xạ alpha liều cao độc hại."
    ]
},
{
    name: "element_darmstadtium",
    keywords: ["darmstadtium", "nguyên tố ds", "z=110"],
    responses: [
        "🧪 DARMSTADTIUM (Ds) - Z: 110 - Chu kỳ: 7 - Nhóm: VIII (10) - Khối lượng: 281 amu - e: [Rn] 5f14 6d9 7s1. Tính chất hóa học: Nguyên tố tổng hợp nhân tạo siêu nặng. Công dụng: Nghiên cứu cấu trúc hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ cao."
    ]
},
{
    name: "element_dubnium",
    keywords: ["dubnium", "dubni", "nguyên tố db", "z=105"],
    responses: [
        "🧪 DUBNIUM (Db) - Z: 105 - Chu kỳ: 7 - Nhóm: VB (5) - Khối lượng: 268 amu - e: [Rn] 5f14 6d3 7s2. Tính chất hóa học: Kim loại chuyển tiếp tổng hợp, tính chất hóa học tương tự Tantan. Công dụng: Nghiên cứu khoa học. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã hạt nhân nhanh."
    ]
},
{
    name: "element_dysprosium",
    keywords: ["dysprosi", "dysprosium", "nguyên tố dy", "z=66"],
    responses: [
        "🧪 DYSPROSI (Dy) - Z: 66 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 162.50 amu - e: [Xe] 4f10 6s2. Tính chất hóa học: Kim loại đất hiếm, từ tính cao, phản ứng chậm với nước lạnh nhưng nhanh với axit. Công dụng: Nam châm vĩnh cửu siêu mạnh trong xe điện, thanh kiểm soát lò hạt nhân. Nguy hiểm: ÍT ĐỘC HẠI, nhưng bụi Dysprosi gây nguy cơ cháy nổ."
    ]
},
{
    name: "element_einsteinium",
    keywords: ["einsteini", "einsteinium", "nguyên tố es", "z=99"],
    responses: [
        "🧪 EINSTEINI (Es) - Z: 99 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 252 amu - e: [Rn] 5f11 7s2. Tính chất hóa học: Kim loại phóng xạ nhân tạo, dễ phản ứng với oxy và axit. Công dụng: Dùng trong nghiên cứu khoa học cơ bản và tạo nguyên tố siêu nặng. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ cao, gây độc tế bào và biến đổi di truyền."
    ]
},
{
    name: "element_erbium",
    keywords: ["erbi", "erbium", "nguyên tố er", "z=68"],
    responses: [
        "🧪 ERBI (Er) - Z: 68 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 167.26 amu - e: [Xe] 4f12 6s2. Tính chất hóa học: Kim loại đất hiếm, bị oxy hóa chậm trong không khí, tan trong axit loãng. Công dụng: Bộ khuếch đại cáp quang, laser y tế nha khoa, nhuộm hồng thủy tinh. Nguy hiểm: ÍT ĐỘC HẠI, nhưng hợp chất tan của Erbi gây kích ứng nhẹ và bụi kim loại dễ cháy."
    ]
},
{
    name: "element_europium",
    keywords: ["europi", "europium", "nguyên tố eu", "z=63"],
    responses: [
        "🧪 EUROPI (Eu) - Z: 63 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 151.96 amu - e: [Xe] 4f7 6s2. Tính chất hóa học: Kim loại đất hiếm phản ứng mạnh nhất, bốc cháy trong không khí ở 150-180 độ C. Công dụng: Chất huỳnh quang phát màu đỏ trong màn hình TV, tem chống giả tiền Euro. Nguy hiểm: ĐỘC MỨC TRUNG BÌNH, bụi Europi phản ứng mạnh với không khí gây nguy cơ cháy nổ cao."
    ]
},
{
    name: "element_fermium",
    keywords: ["fermi", "fermium", "nguyên tố fm", "z=100"],
    responses: [
        "🧪 FERMI (Fm) - Z: 100 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 257 amu - e: [Rn] 5f12 7s2. Tính chất hóa học: Kim loại phóng xạ tổng hợp, tính chất hóa học tương tự các Actini nặng khác. Công dụng: Nghiên cứu vật lý hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do phát xạ tia alpha năng lượng cao."
    ]
},
{
    name: "element_flerovium",
    keywords: ["flerovi", "flerovium", "nguyên tố fl", "z=114"],
    responses: [
        "🧪 FLEROVI (Fl) - Z: 114 - Chu kỳ: 7 - Nhóm: IVA (14) - Khối lượng: 289 amu - e: [Rn] 5f14 6d10 7s2 7p2. Tính chất hóa học: Nguyên tố phóng xạ siêu nặng, dự đoán có đặc tính trơ giống khí hiếm. Công dụng: Nghiên cứu đảo bền hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã phóng xạ."
    ]
},
{
    name: "element_fluorine",
    keywords: ["flo", "fluorine", "nguyên tố f", "z=9"],
    responses: [
        "🧪 FLO (F) - Z: 9 - Chu kỳ: 2 - Nhóm: VIIA (17) - Khối lượng: 18.998 amu - e: 1s2 2s2 2p5. Tính chất hóa học: Halogen có tính oxy hóa mạnh nhất, phản ứng với hầu hết mọi chất kể cả vàng và bạch kim. Công dụng: Kem đánh răng (Flouride), sản xuất chảo chống dính Teflon, khí làm lạnh. Nguy hiểm: CỰC KỲ ĐỘC HẠI VÀ NGUY HIỂM, khí Flo tự bốc cháy, ăn mòn da thịt đến tận xương."
    ]
},
{
    name: "element_francium",
    keywords: ["franci", "francium", "nguyên tố fr", "z=87"],
    responses: [
        "🧪 FRANCI (Fr) - Z: 87 - Chu kỳ: 7 - Nhóm: IA (1) - Khối lượng: 223 amu - e: [Rn] 7s1. Tính chất hóa học: Kim loại kiềm cực kỳ kém bền, phản ứng nổ dữ dội nhất với nước. Công dụng: Nghiên cứu lực tương tác yếu trong hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do vừa bốc nổ cực mạnh vừa có tính phóng xạ cao."
    ]
},
{
    name: "element_gadolinium",
    keywords: ["gadolini", "gadolinium", "nguyên tố gd", "z=64"],
    responses: [
        "🧪 GADOLINI (Gd) - Z: 64 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 157.25 amu - e: [Xe] 4f7 5d1 6s2. Tính chất hóa học: Kim loại đất hiếm từ tính, tan trong axit giải phóng H2. Công dụng: Chất tương phản khi chụp cộng hưởng từ MRI, lò phản ứng hạt nhân. Nguy hiểm: ĐỘC HẠI KHÁ CAO ở dạng ion tự do, nhưng an toàn khi dùng làm thuốc tương phản MRI phức chất."
    ]
},
{
    name: "element_gallium",
    keywords: ["gali", "gallium", "nguyên tố ga", "z=31"],
    responses: [
        "🧪 GALI (Ga) - Z: 31 - Chu kỳ: 4 - Nhóm: IIIA (13) - Khối lượng: 69.723 amu - e: [Ar] 3d10 4s2 4p1. Tính chất hóa học: Kim loại yếu, hóa lỏng ở 29.76 độ C, làm giòn và phá hủy kết cấu nhôm. Công dụng: Linh kiện bán dẫn GaAs trong điện thoại, pin mặt trời, nhiệt kế. Nguy hiểm: AN TOÀN KHI TIẾP XÚC DA, nhưng gây ăn mòn mạnh đối với các kim loại khác như nhôm."
    ]
},
{
    name: "element_germanium",
    keywords: ["gemani", "gemanium", "germanium", "nguyên tố ge", "z=32"],
    responses: [
        "🧪 GEMANI (Ge) - Z: 32 - Chu kỳ: 4 - Nhóm: IVA (14) - Khối lượng: 72.630 amu - e: [Ar] 3d10 4s2 4p2. Tính chất hóa học: Á kim giòn, không phản ứng với nước và không khí ở nhiệt độ thường. Công dụng: Cáp quang, kính hồng ngoại quân sự, linh kiện bán dẫn. Nguy hiểm: ÍT ĐỘC HẠI ở dạng nguyên tố, nhưng muối Gemani có thể gây tổn thương thận."
    ]
},
{
    name: "element_gold",
    keywords: ["vàng", "gold", "aurum", "nguyên tố au", "z=79"],
    responses: [
        "🧪 VÀNG (Au) - Z: 79 - Chu kỳ: 6 - Nhóm: IB (11) - Khối lượng: 196.97 amu - e: [Xe] 4f14 5d10 6s1. Tính chất hóa học: Kim loại quý cực kỳ trơ, không bị oxy hóa, chỉ tan trong nước cường toan (HNO3 + HCl). Công dụng: Trang sức, dự trữ tài chính, vi mạch điện tử cao cấp, nha khoa. Nguy hiểm: AN TOÀN TUYỆT ĐỐI, hoàn toàn trơ và không độc hại cho cơ thể."
    ]
},
{
    name: "element_hafnium",
    keywords: ["hafni", "hafnium", "nguyên tố hf", "z=72"],
    responses: [
        "🧪 HAFNI (Hf) - Z: 72 - Chu kỳ: 6 - Nhóm: IVB (4) - Khối lượng: 178.49 amu - e: [Xe] 4f14 5d2 6s2. Tính chất hóa học: Kim loại chuyển tiếp chịu ăn mòn cực tốt, chống axit mạnh. Công dụng: Thanh kiểm soát trong tàu ngầm hạt nhân, vi xử lý máy tính Intel. Nguy hiểm: BỤI HAFNI DỄ CHÁY NỔ, ít độc hại về mặt hóa học nhưng bốc cháy khi ma sát."
    ]
},
{
    name: "element_hassium",
    keywords: ["hassi", "hassium", "nguyên tố hs", "z=108"],
    responses: [
        "🧪 HASSI (Hs) - Z: 108 - Chu kỳ: 7 - Nhóm: VIII (8) - Khối lượng: 269 amu - e: [Rn] 5f14 6d6 7s2. Tính chất hóa học: Nguyên tố phóng xạ nhân tạo, dự đoán tạo oxit HsO4 dễ bay hơi. Công dụng: Nghiên cứu hóa học nguyên tố siêu nặng. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã phóng xạ."
    ]
},
{
    name: "element_helium",
    keywords: ["heli", "helium", "nguyên tố he", "z=2"],
    responses: [
        "🧪 HELI (He) - Z: 2 - Chu kỳ: 1 - Nhóm: VIIIA (18) - Khối lượng: 4.0026 amu - e: 1s2. Tính chất hóa học: Khí hiếm trơ tuyệt đối, nhẹ hơn không khí, không cháy nổ. Công dụng: Bơm khinh khí cầu, làm mát máy chụp MRI, khí lặn biển sâu. Nguy hiểm: AN TOÀN, nhưng hít quá nhiều khí Heli gây thiếu oxy não dẫn đến ngất xỉu."
    ]
},
{
    name: "element_holmium",
    keywords: ["holmi", "holmium", "nguyên tố ho", "z=67"],
    responses: [
        "🧪 HOLMI (Ho) - Z: 67 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 164.93 amu - e: [Xe] 4f11 6s2. Tính chất hóa học: Kim loại đất hiếm có momen từ cao nhất, bị oxy hóa chậm trong không khí. Công dụng: Tạo từ trường mạnh nhất cho nam châm, laser y tế tán sỏi thận. Nguy hiểm: ĐỘC NHẸ, bụi Holmi dễ cháy nổ."
    ]
},
{
    name: "element_hydrogen",
    keywords: ["hydro", "hydrogen", "nguyên tố h", "z=1"],
    responses: [
        "🧪 HYDRO (H) - Z: 1 - Chu kỳ: 1 - Nhóm: IA (1) - Khối lượng: 1.008 amu - e: 1s1. Tính chất hóa học: Phi kim có tính khử mạnh, cháy trong oxy tạo nước. Công dụng: Nhiên liệu tên lửa, xe điện pin nhiên liệu, sản xuất phân bón Amoniac. Nguy hiểm: DỄ CHÁY NỔ CỰC KỲ, hỗn hợp khí Hydro và Oxy gây nổ rất mạnh khi có tia lửa."
    ]
},
{
    name: "element_indium",
    keywords: ["indi", "indium", "nguyên tố in", "z=49"],
    responses: [
        "🧪 INDI (In) - Z: 49 - Chu kỳ: 5 - Nhóm: IIIA (13) - Khối lượng: 114.82 amu - e: [Kr] 4d10 5s2 5p1. Tính chất hóa học: Kim loại yếu cực mềm, phát ra tiếng kêu khi uốn cong, tan trong axit. Công dụng: Màn hình cảm ứng (ITO), lớp phủ gương chống mài mòn, mối hàn. Nguy hiểm: ĐỘC HẠI KHI HÍT PHẢI, bụi Indi gây tổn thương phổi và hệ miễn dịch."
    ]
},
{
    name: "element_iodine",
    keywords: ["iốt", "iot", "iodine", "nguyên tố i", "z=53"],
    responses: [
        "🧪 IỐT (I) - Z: 53 - Chu kỳ: 5 - Nhóm: VIIA (17) - Khối lượng: 126.90 amu - e: [Kr] 4d10 5s2 5p5. Tính chất hóa học: Halogen thể rắn màu tím đen, dễ thăng hoa thành hơi màu tím, có tính oxy hóa. Công dụng: Thuốc sát trùng vết thương, gia vị phòng bệnh bướu cổ, dược phẩm. Nguy hiểm: ĐỘC HẠI NẾU DÙNG QUÁ LIỀU, hơi Iốt gây kích ứng mắt và hệ hô hấp."
    ]
},
{
    name: "element_iridium",
    keywords: ["iridi", "iridium", "nguyên tố ir", "z=77"],
    responses: [
        "🧪 IRIDI (Ir) - Z: 77 - Chu kỳ: 6 - Nhóm: VIII (9) - Khối lượng: 192.22 amu - e: [Xe] 4f14 5d7 6s2. Tính chất hóa học: Kim loại chuyển tiếp chống ăn mòn tốt nhất thế giới, không tan trong axit kể cả nước cường toan. Công dụng: Bu-gi xe đua, nồi nấu kim loại chịu nhiệt cao, công tắc điện. Nguy hiểm: AN TOÀN ở dạng kim loại khối, nhưng bụi Iridi gây kích ứng da mắt."
    ]
},
{
    name: "element_iron",
    keywords: ["sắt", "sat", "iron", "ferrum", "nguyên tố fe", "z=26"],
    responses: [
        "🧪 SẮT (Fe) - Z: 26 - Chu kỳ: 4 - Nhóm: VIII (8) - Khối lượng: 55.845 amu - e: [Ar] 3d6 4s2. Tính chất hóa học: Kim loại chuyển tiếp trung bình, bị gỉ trong không khí ẩm tạo Fe2O3.nH2O. Công dụng: Kết cấu xây dựng, chế tạo ô tô, tàu thủy, vận chuyển oxy trong máu (Huyết cầu). Nguy hiểm: AN TOÀN, nhưng uống quá liều thuốc bổ sắt có thể gây ngộ độc sắt ở trẻ em."
    ]
},
{
    name: "element_krypton",
    keywords: ["kripton", "krypton", "nguyên tố kr", "z=36"],
    responses: [
        "🧪 KRIPTON (Kr) - Z: 36 - Chu kỳ: 4 - Nhóm: VIIIA (18) - Khối lượng: 83.798 amu - e: [Ar] 3d10 4s2 4p6. Tính chất hóa học: Khí hiếm trơ, chỉ phản ứng với Flo trong điều kiện cực đoan. Công dụng: Đèn flash chụp ảnh tốc độ cao, đèn đường run-way sân bay, laser y tế. Nguy hiểm: AN TOÀN, nhưng có thể gây ngạt thở nếu nồng độ quá cao trong phòng kín."
    ]
},
{
    name: "element_lanthanum",
    keywords: ["lantan", "lanthanum", "nguyên tố la", "z=57"],
    responses: [
        "🧪 LANTAN (La) - Z: 57 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 138.91 amu - e: [Xe] 5d1 6s2. Tính chất hóa học: Kim loại đất hiếm mềm, bốc cháy trong không khí ở 440 độ C, phản ứng với nước. Công dụng: Pin xe Hybrid (Toyota Prius), ống kính máy ảnh cao cấp, đá lửa. Nguy hiểm: ĐỘC NHẸ ĐẾN TRUNG BÌNH, bụi Lantan dễ gây tổn thương gan phổi."
    ]
},
{
    name: "element_lawrencium",
    keywords: ["lawrenci", "lawrencium", "nguyên tố lr", "z=103"],
    responses: [
        "🧪 LAWRENCI (Lr) - Z: 103 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 266 amu - e: [Rn] 5f14 7s2 7p1. Tính chất hóa học: Kim loại phóng xạ nhân tạo, đặc tính thuộc nhóm Actini nặng. Công dụng: Duy nhất dùng nghiên cứu hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ mạnh."
    ]
},
{
    name: "element_lead",
    keywords: ["chì", "chi", "lead", "plumbum", "nguyên tố pb", "z=82"],
    responses: [
        "🧪 CHÌ (Pb) - Z: 82 - Chu kỳ: 6 - Nhóm: IVA (14) - Khối lượng: 207.2 amu - e: [Xe] 4f14 5d10 6s2 6p2. Tính chất hóa học: Kim loại yếu, bề mặt bị mờ đi trong không khí, cản tia bức xạ cực tốt. Công dụng: Bình ắc quy xe máy ô tô, tấm chắn tia X trong y tế, đạn dược. Nguy hiểm: CỰC KỲ ĐỘC HẠI, gây tổn thương não thần kinh vĩnh viễn, đặc biệt cực kỳ nguy hiểm cho trẻ em."
    ]
},
{
    name: "element_lithium",
    keywords: ["liti", "lithium", "nguyên tố li", "z=3"],
    responses: [
        "🧪 LITI (Li) - Z: 3 - Chu kỳ: 2 - Nhóm: IA (1) - Khối lượng: 6.94 amu - e: [He] 2s1. Tính chất hóa học: Kim loại kiềm nhẹ nhất, phản ứng mạnh với nước tạo LiOH và khí H2. Công dụng: Pin Lithium-ion (điện thoại, xe điện), hợp kim chế tạo máy bay, thuốc thần kinh. Nguy hiểm: NGUY HIỂM, gây bỏng hóa học khi chạm da, pin Lithium bị hỏng có thể phát nổ dữ dội."
    ]
},
{
    name: "element_livermorium",
    keywords: ["livermori", "livermorium", "nguyên tố lv", "z=116"],
    responses: [
        "🧪 LIVERMORI (Lv) - Z: 116 - Chu kỳ: 7 - Nhóm: VIA (16) - Khối lượng: 293 amu - e: [Rn] 5f14 6d10 7s2 7p4. Tính chất hóa học: Nguyên tố tổng hợp nhân tạo siêu nặng. Công dụng: Nghiên cứu lý thuyết vật lý hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do phóng xạ cực nhanh."
    ]
},
{
    name: "element_lutetium",
    keywords: ["lutesi", "lutetium", "nguyên tố lu", "z=71"],
    responses: [
        "🧪 LUTESI (Lu) - Z: 71 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 174.97 amu - e: [Xe] 4f14 5d1 6s2. Tính chất hóa học: Kim loại đất hiếm cứng nhất và nặng nhất ho Lantan, trơ hơn các đất hiếm khác. Công dụng: Chất xúc tác trong nhà máy lọc dầu, phát hiện ung thư PET scan. Nguy hiểm: ĐỘC NHẸ, bụi Lutesi dễ gây cháy nổ."
    ]
},
{
    name: "element_magnesium",
    keywords: ["magie", "magnesium", "nguyên tố mg", "z=12"],
    responses: [
        "🧪 MAGIE (Mg) - Z: 12 - Chu kỳ: 3 - Nhóm: IIA (2) - Khối lượng: 24.305 amu - e: [Ne] 3s2. Tính chất hóa học: Kim loại kiềm thổ, cháy trong không khí tỏa ánh sáng chói lóa và nhiệt độ cực cao. Công dụng: Vỏ máy tính laptop, khung xe ô tô, pháo sáng, thuốc chữa đau dạ dày. Nguy hiểm: AN TOÀN KHÓI BỤI, nhưng kim loại Magie dạng dải/bụi cháy rất khó dập tắt bằng nước."
    ]
},
{
    name: "element_manganese",
    keywords: ["mangan", "manganese", "nguyên tố mn", "z=25"],
    responses: [
        "🧪 MANGAN (Mn) - Z: 25 - Chu kỳ: 4 - Nhóm: VIIB (7) - Khối lượng: 54.938 amu - e: [Ar] 3d5 4s2. Tính chất hóa học: Kim loại chuyển tiếp cứng giòn, hợp chất KMnO4 có tính oxy hóa cực mạnh. Công dụng: Tăng độ cứng cho thép gia cường, vỏ lon nước ngọt, pin cacbon-zanh. Nguy hiểm: ĐỘC HẠI KHI HÍT PHẢI LÂU NGÀY, gây hội chứng Manganism giống bệnh Parkinson."
    ]
},
{
    name: "element_meitnerium",
    keywords: ["meitneri", "meitnerium", "nguyên tố mt", "z=109"],
    responses: [
        "🧪 MEITNERI (Mt) - Z: 109 - Chu kỳ: 7 - Nhóm: VIII (9) - Khối lượng: 278 amu - e: [Rn] 5f14 6d7 7s2. Tính chất hóa học: Nguyên tố phóng xạ siêu nặng, dự đoán thuộc nhóm kim loại bạch kim. Công dụng: Nghiên cứu phòng thí nghiệm. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã hạt nhân nhanh."
    ]
},
{
    name: "element_mendelevium",
    keywords: ["mendelevi", "mendelevium", "nguyên tố md", "z=101"],
    responses: [
        "🧪 MENDELEVI (Md) - Z: 101 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 258 amu - e: [Rn] 5f13 7s2. Tính chất hóa học: Kim loại phóng xạ tổng hợp, có trạng thái oxy hóa +2 và +3. Công dụng: Nghiên cứu hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ."
    ]
},
{
    name: "element_mercury",
    keywords: ["thủy ngân", "thuy ngan", "mercury", "hydrargyrum", "nguyên tố hg", "z=80"],
    responses: [
        "🧪 THỦY NGÂN (Hg) - Z: 80 - Chu kỳ: 6 - Nhóm: IIB (12) - Khối lượng: 200.59 amu - e: [Xe] 4f14 5d10 6s2. Tính chất hóa học: Kim loại duy nhất ở dạng lỏng ở nhiệt độ phòng, dễ bay hơi, tạo hợp kim amagam với kim loại khác. Công dụng: Nhiệt kế cũ, công tắc áp suất, bóng đèn huỳnh quang. Nguy hiểm: CỰC KỲ ĐỘC HẠI, hơi thủy ngân làm hỏng hệ thần kinh trung ương, gan thận và gây dị tật bẩm sinh."
    ]
},
{
    name: "element_molybdenum",
    keywords: ["molibden", "molybdenum", "nguyên tố mo", "z=42"],
    responses: [
        "🧪 MOLIBDEN (Mo) - Z: 42 - Chu kỳ: 5 - Nhóm: VIB (6) - Khối lượng: 95.95 amu - e: [Kr] 4d5 5s1. Tính chất hóa học: Kim loại chuyển tiếp cứng, điểm nóng chảy rất cao (2623 độ C), chịu ăn mòn. Công dụng: Thép siêu cứng chịu nhiệt, bộ phận động cơ tên lửa, vi chất dinh dưỡng. Nguy hiểm: ÍT ĐỘC HẠI, nhưng liều cao gây thiếu hụt đồng trong cơ thể."
    ]
},
{
    name: "element_moscovium",
    keywords: ["moscovi", "moscovium", "nguyên tố mc", "z=115"],
    responses: [
        "🧪 MOSCOVI (Mc) - Z: 115 - Chu kỳ: 7 - Nhóm: VA (15) - Khối lượng: 290 amu - e: [Rn] 5f14 6d10 7s2 7p3. Tính chất hóa học: Nguyên tố tổng hợp siêu nặng, phân rã cực nhanh. Công dụng: Nghiên cứu khoa học hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do bức xạ phóng xạ."
    ]
},
{
    name: "element_neodymium",
    keywords: ["neodim", "neodymium", "nguyên tố nd", "z=60"],
    responses: [
        "🧪 NEODIM (Nd) - Z: 60 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 144.24 amu - e: [Xe] 4f4 6s2. Tính chất hóa học: Kim loại đất hiếm, bị oxy hóa nhanh trong không khí tạo lớp oxit xốp. Công dụng: Nam châm vĩnh cửu NdFeB siêu mạnh, tai nghe, động cơ xe điện, laser y tế. Nguy hiểm: ĐỘC NHẸ, bụi Neodim gây kích ứng mắt, phổi và nguy cơ cháy nổ."
    ]
},
{
    name: "element_neon",
    keywords: ["neon", "nguyên tố ne", "z=10"],
    responses: [
        "🧪 NEON (Ne) - Z: 10 - Chu kỳ: 2 - Nhóm: VIIIA (18) - Khối lượng: 20.180 amu - e: 1s2 2s2 2p6. Tính chất hóa học: Khí hiếm trơ hoàn toàn, không tạo hợp chất hóa học bền ở điều kiện thường. Công dụng: Đèn quảng cáo Neon phát sáng đỏ cam, tia laser, chất làm lạnh sâu. Nguy hiểm: AN TOÀN, nhưng gây ngạt thở nếu nồng độ quá cao làm giảm oxy trong không khí."
    ]
},
{
    name: "element_neptunium",
    keywords: ["neptuni", "neptunium", "nguyên tố np", "z=93"],
    responses: [
        "🧪 NEPTUNI (Np) - Z: 93 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 237 amu - e: [Rn] 5f4 6d1 7s2. Tính chất hóa học: Kim loại phóng xạ nhân tạo, có nhiều trạng thái oxy hóa từ +3 đến +7. Công dụng: Dùng làm chất tiền đề chế tạo Plutoni-238 cho máy phát điện vũ trụ. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ cao và độc tính sinh học tích tụ trong xương."
    ]
},
{
    name: "element_nickel",
    keywords: ["niken", "nickel", "nguyên tố ni", "z=28"],
    responses: [
        "🧪 NIKEN (Ni) - Z: 28 - Chu kỳ: 4 - Nhóm: VIII (10) - Khối lượng: 58.693 amu - e: [Ar] 3d8 4s2. Tính chất hóa học: Kim loại chuyển tiếp, chống oxy hóa và ăn mòn tốt, tan chậm trong axit loãng. Công dụng: Sản xuất thép không gỉ (Inox), pin sạc NiMH, tiền xu, mạ bảo vệ kim loại. Nguy hiểm: DỄ GÂY DỊ ỨNG DA (viêm da tiếp xúc), hít phải bụi Niken lâu ngày có thể gây ung thư phổi."
    ]
},
{
    name: "element_nihonium",
    keywords: ["nihoni", "nihonium", "nguyên tố nh", "z=113"],
    responses: [
        "🧪 NIHONI (Nh) - Z: 113 - Chu kỳ: 7 - Nhóm: IIIA (13) - Khối lượng: 286 amu - e: [Rn] 5f14 6d10 7s2 7p1. Tính chất hóa học: Nguyên tố phóng xạ siêu nặng tổng hợp nhân tạo. Công dụng: Nghiên cứu vật lý hạt nhân phòng thí nghiệm. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã phóng xạ cực nhanh."
    ]
},
{
    name: "element_niobium",
    keywords: ["niobi", "niobium", "columbium", "nguyên tố nb", "z=41"],
    responses: [
        "🧪 NIOBI (Nb) - Z: 41 - Chu kỳ: 5 - Nhóm: VB (5) - Khối lượng: 92.906 amu - e: [Kr] 4d4 5s1. Tính chất hóa học: Kim loại chuyển tiếp trơ hóa học ở nhiệt độ phòng, có tính siêu dẫn. Công dụng: Thép hợp kim chịu lực cho cầu đường, nam châm siêu dẫn trong máy MRI, trang sức. Nguy hiểm: AN TOÀN KHI THỂ KHỐI, bụi Niobi gây kích ứng da mắt và có nguy cơ cháy."
    ]
},
{
    name: "element_nitrogen",
    keywords: ["nitơ", "nito", "nitrogen", "nguyên tố n", "z=7"],
    responses: [
        "🧪 NITƠ (N) - Z: 7 - Chu kỳ: 2 - Nhóm: VA (15) - Khối lượng: 14.007 amu - e: 1s2 2s2 2p3. Tính chất hóa học: Phi kim trơ ở nhiệt độ thường do liên kết ba bền vững, hoạt động ở nhiệt độ cao. Công dụng: Phân bón hóa học (Ure), bảo quản thực phẩm, Nitơ lỏng làm lạnh sâu. Nguy hiểm: AN TOÀN TRONG KHÔNG KHÍ, nhưng khí Nitơ nguyên chất gây ngạt tử vong nhanh chóng không báo trước."
    ]
},
{
    name: "element_nobelium",
    keywords: ["nobeli", "nobelium", "nguyên tố no", "z=102"],
    responses: [
        "🧪 NOBELI (No) - Z: 102 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 259 amu - e: [Rn] 5f14 7s2. Tính chất hóa học: Kim loại phóng xạ tổng hợp, trạng thái oxy hóa +2 bền trong dung dịch. Công dụng: Nghiên cứu khoa học hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do phát xạ phóng xạ mạnh."
    ]
},
{
    name: "element_oganesson",
    keywords: ["oganesson", "nguyên tố og", "z=118"],
    responses: [
        "🧪 OGANESSON (Og) - Z: 118 - Chu kỳ: 7 - Nhóm: VIIIA (18) - Khối lượng: 294 amu - e: [Rn] 5f14 6d10 7s2 7p6. Tính chất hóa học: Nguyên tố phóng xạ siêu nặng cuối chu kỳ 7, dự đoán có thể ở dạng rắn thay vì khí. Công dụng: Nghiên cứu lý thuyết cấu trúc nguyên tử. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã hạt nhân trong tích tắc."
    ]
},
{
    name: "element_osmium",
    keywords: ["osmi", "osmium", "nguyên tố os", "z=76"],
    responses: [
        "🧪 OSMI (Os) - Z: 76 - Chu kỳ: 6 - Nhóm: VIII (8) - Khối lượng: 190.23 amu - e: [Xe] 4f14 5d6 6s2. Tính chất hóa học: Kim loại có khối lượng riêng lớn nhất (tỷ trọng cao nhất), tạo OsO4 dễ bay hơi. Công dụng: Ngòi bút máy cao cấp, kim đĩa than, hợp kim siêu cứng chịu mài mòn. Nguy hiểm: CỰC KỲ ĐỘC HẠI, oxit OsO4 bay hơi ăn mòn niêm mạc, gây mù lừa và tổn thương phổi nghiêm trọng."
    ]
},
{
    name: "element_oxygen",
    keywords: ["oxy", "oxit", "oxygen", "nguyên tố o", "z=8"],
    responses: [
        "🧪 OXY (O) - Z: 8 - Chu kỳ: 2 - Nhóm: VIA (16) - Khối lượng: 15.999 amu - e: 1s2 2s2 2p4. Tính chất hóa học: Phi kim tính oxy hóa mạnh, duy trì sự cháy và sự sống, phản ứng với hầu hết nguyên tố. Công dụng: Hô hấp y tế, hàn cắt gió đá, tên lửa nhiên liệu lỏng, sản xuất thép. Nguy hiểm: AN TOÀN NẾU THỞ BÌNH THƯỜNG, nhưng Oxy nồng độ cao gây ngộ độc phổi/thần kinh và làm tăng nguy cơ cháy nổ cực kỳ mãnh liệt."
    ]
},
{
    name: "element_palladium",
    keywords: ["paladi", "palladium", "nguyên tố pd", "z=46"],
    responses: [
        "🧪 PALADI (Pd) - Z: 46 - Chu kỳ: 5 - Nhóm: VIII (10) - Khối lượng: 106.42 amu - e: [Kr] 4d10. Tính chất hóa học: Kim loại quý nhóm Bạch kim, hấp thụ khí Hydro cực tốt (gấp 900 lần thể tích của nó). Công dụng: Bộ lọc khí thải ô tô (chuyển đổi khí độc), trang sức bạch kim giả, linh kiện điện tử. Nguy hiểm: AN TOÀN THỂ KHỐI, muối Paladi tan có thể gây kích ứng da và tổn thương gan thận."
    ]
},
{
    name: "element_phosphorus",
    keywords: ["phốt pho", "photpho", "phosphorus", "nguyên tố p", "z=15"],
    responses: [
        "🧪 PHỐT PHO (P) - Z: 15 - Chu kỳ: 3 - Nhóm: VA (15) - Khối lượng: 30.974 amu - e: [Ne] 3s2 3p3. Tính chất hóa học: Phi kim đa dạng dạng thù hình (trắng, đỏ, đen), phốt pho trắng tự bốc cháy trong không khí ở 30 độ C. Công dụng: Sản xuất phân bón Supephotphat, bao diêm, pháo hoa, chất bán dẫn. Nguy hiểm: PHỐT PHO TRẮNG CỰC KỲ ĐỘC HẠI VÀ NGUY HIỂM, gây bỏng ăn sâu vào da thịt và ngộ độc tử vong."
    ]
},
{
    name: "element_platinum",
    keywords: ["bạch kim", "bach kim", "platinum", "nguyên tố pt", "z=78"],
    responses: [
        "🧪 BẠCH KIM (Pt) - Z: 78 - Chu kỳ: 6 - Nhóm: VIII (10) - Khối lượng: 195.08 amu - e: [Xe] 4f14 5d9 6s1. Tính chất hóa học: Kim loại quý cực kỳ trơ, không bị oxy hóa ở bất kỳ nhiệt độ nào, tan trong nước cường toan. Công dụng: Trang sức cao cấp, chất xúc tác hóa học, thiết bị y tế y học, bugi xe. Nguy hiểm: AN TOÀN HOÀN TOÀN ở dạng kim loại, muối bạch kim có thể gây dị ứng hen suyễn."
    ]
},
{
    name: "element_plutonium",
    keywords: ["plutoni", "plutonium", "nguyên tố pu", "z=94"],
    responses: [
        "🧪 PLUTONI (Pu) - Z: 94 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 244 amu - e: [Rn] 5f6 7s2. Tính chất hóa học: Kim loại phóng xạ nhân tạo, có tính bốc cháy trong không khí ẩm, phản ứng hóa học phức tạp. Công dụng: Nhiên liệu lò phản ứng hạt nhân, nguyên liệu chế tạo vũ khí hạt nhân (bom nguyên tử). Nguy hiểm: CỰC KỲ ĐỘC HẠI VÀ NGUY HIỂM, vừa độc hóa học vừa phát xạ alpha tích tụ gây ung thư xương."
    ]
},
{
    name: "element_polonium",
    keywords: ["poloni", "polonium", "nguyên tố po", "z=84"],
    responses: [
        "🧪 POLONI (Po) - Z: 84 - Chu kỳ: 6 - Nhóm: VIA (16) - Khối lượng: 209 amu - e: [Xe] 4f14 5d10 6s2 6p4. Tính chất hóa học: Á kim phóng xạ hiếm, phát nhiệt mạnh do tự phân rã, bay hơi dễ dàng ở nhiệt độ thấp. Công dụng: Loại bỏ tĩnh điện trong công nghiệp, nguồn nhiệt cho vệ tinh vũ trụ. Nguy hiểm: MỘT TRONG NHỮNG CHẤT ĐỘC NHẤT THẾ GIỚI, liều cực nhỏ gây tử vong nhanh chóng do phá hủy nội tạng."
    ]
},
{
    name: "element_potassium",
    keywords: ["kali", "potassium", "kalium", "nguyên tố k", "z=19"],
    responses: [
        "🧪 KALI (K) - Z: 19 - Chu kỳ: 4 - Nhóm: IA (1) - Khối lượng: 39.098 amu - e: [Ar] 4s1. Tính chất hóa học: Kim loại kiềm mềm, tính khử cực mạnh, phản ứng nổ bốc cháy khi tiếp xúc với nước. Công dụng: Phân bón Kali cho cây trồng, chất điện giải sinh học duy trì nhịp tim, xà phòng lỏng. Nguy hiểm: NGUY HIỂM Ở DẠNG NGUYÊN CHẤT (gây nổ bốc cháy khi gặp nước), ion K+ rất an toàn và cần thiết cho cơ thể."
    ]
},
{
    name: "element_praseodymium",
    keywords: ["praseodim", "praseodymium", "nguyên tố pr", "z=59"],
    responses: [
        "🧪 PRASEODIM (Pr) - Z: 59 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 140.91 amu - e: [Xe] 4f3 6s2. Tính chất hóa học: Kim loại đất hiếm mềm, bị oxy hóa từ từ trong không khí tạo lớp oxit màu xanh lá. Công dụng: Kính bảo hộ thợ hàn (lọc tia UV), màu nhuộm gốm sứ thủy tinh, động cơ máy bay. Nguy hiểm: ĐỘC NHẸ, bụi Praseodim có thể gây kích ứng mắt da và dễ cháy."
    ]
},
{
    name: "element_promethium",
    keywords: ["prometi", "promethium", "nguyên tố pm", "z=61"],
    responses: [
        "🧪 PROMETI (Pm) - Z: 61 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 145 amu - e: [Xe] 4f5 6s2. Tính chất hóa học: Nguyên tố đất hiếm duy nhất có tính phóng xạ, tạo muối phát sáng trong đêm. Công dụng: Pin hạt nhân siêu nhỏ cho đồng hồ/máy trợ tim, đo độ dày vật liệu. Nguy hiểm: CỰC KỲ NGUY HIỂM do bức xạ bêta phát ra liên tục."
    ]
},
{
    name: "element_protactinium",
    keywords: ["protactini", "protactinium", "nguyên tố pa", "z=91"],
    responses: [
        "🧪 PROTACTINI (Pa) - Z: 91 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 231.04 amu - e: [Rn] 5f2 6d1 7s2. Tính chất hóa học: Kim loại phóng xạ tự nhiên hiếm, tác dụng với axit mạnh, không tan trong kiềm. Công dụng: Định tuổi trầm tích đại dương, nghiên cứu khoa học. Nguy hiểm: CỰC KỲ NGUY HIỂM do độc tính sinh học cao và tính phóng xạ alpha."
    ]
},
{
    name: "element_radium",
    keywords: ["radi", "radium", "nguyên tố ra", "z=88"],
    responses: [
        "🧪 RADI (Ra) - Z: 88 - Chu kỳ: 7 - Nhóm: IIA (2) - Khối lượng: 226 amu - e: [Rn] 7s2. Tính chất hóa học: Kim loại kiềm thổ phóng xạ, phát ra ánh sáng huỳnh quang xanh nhạt, phản ứng mạnh với nước. Công dụng: Từng dùng làm sơn phát sáng kim đồng hồ, điều trị ung thư cổ xưa. Nguy hiểm: CỰC KỲ NGUY HIỂM, gây hoại tử xương hàm, ung thư xương do tích tụ thay thế Canxi."
    ]
},
{
    name: "element_radon",
    keywords: ["radon", "nguyên tố rn", "z=86"],
    responses: [
        "🧪 RADON (Rn) - Z: 86 - Chu kỳ: 6 - Nhóm: VIIA (18) - Khối lượng: 222 amu - e: [Xe] 4f14 5d10 6s2 6p6. Tính chất hóa học: Khí hiếm phóng xạ không màu không mùi, sinh ra từ sự phân rã của Radium. Công dụng: Nghiên cứu dự báo động đất, điều trị ung thư (xạ trị hẹp). Nguy hiểm: CỰC KỲ NGUY HIỂM, là nguyên nhân hàng đầu gây ung thư phổi ở người không hút thuốc do rò rỉ từ đất đá vào nhà."
    ]
},
{
    name: "element_rhenium",
    keywords: ["reni", "rhenium", "nguyên tố re", "z=75"],
    responses: [
        "🧪 RENI (Re) - Z: 75 - Chu kỳ: 6 - Nhóm: VIIB (7) - Khối lượng: 186.21 amu - e: [Xe] 4f14 5d5 6s2. Tính chất hóa học: Kim loại chuyển tiếp rất hiếm, nhiệt độ nóng chảy cao thứ 3 (sau W và C), kháng ăn mòn. Công dụng: Động cơ phản lực máy bay xiêu thanh, chất xúc tác sản xuất xăng không chì. Nguy hiểm: AN TOÀN Ở DẠNG KIM LOẠI, ít độc hại nhưng rất hiếm và đắt đỏ."
    ]
},
{
    name: "element_rhodium",
    keywords: ["rodi", "rhodium", "nguyên tố rh", "z=45"],
    responses: [
        "🧪 RODI (Rh) - Z: 45 - Chu kỳ: 5 - Nhóm: VIII (9) - Khối lượng: 102.91 amu - e: [Kr] 4d8 5s1. Tính chất hóa học: Kim loại quý nhóm Bạch kim, phản ứng cực kém, độ phản xạ ánh sáng rất cao. Công dụng: Mạ trang sức vàng trắng sáng bóng, bộ lọc khí thải ô tô, gương kính thiên văn. Nguy hiểm: AN TOÀN THỂ KHỐI, hợp chất Rodi dạng hơi/muối có thể gây độc và ung thư."
    ]
},
{
    name: "element_roentgenium",
    keywords: ["roentgeni", "roentgenium", "nguyên tố rg", "z=111"],
    responses: [
        "🧪 ROENTGENI (Rg) - Z: 111 - Chu kỳ: 7 - Nhóm: IB (11) - Khối lượng: 282 amu - e: [Rn] 5f14 6d10 7s1. Tính chất hóa học: Nguyên tố phóng xạ siêu nặng, dự đoán có đặc tính giống vàng nhưng trơ hơn. Công dụng: Nghiên cứu vật lý lý thuyết phòng thí nghiệm. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã hạt nhân nhanh."
    ]
},
{
    name: "element_rubidium",
    keywords: ["rubidi", "rubidium", "nguyên tố rb", "z=37"],
    responses: [
        "🧪 RUBIDI (Rb) - Z: 37 - Chu kỳ: 5 - Nhóm: IA (1) - Khối lượng: 85.468 amu - e: [Kr] 5s1. Tính chất hóa học: Kim loại kiềm rất mềm, tự bốc cháy trong không khí, phản ứng nổ mãnh liệt với nước. Công dụng: Đồng hồ nguyên tử, ống chụp ảnh hồng ngoại, pháo hoa màu tím. Nguy hiểm: CỰC KỲ NGUY HIỂM, bốc cháy tự phát và gây nổ khi tiếp xúc không khí ẩm hoặc nước."
    ]
},
{
    name: "element_ruthenium",
    keywords: ["ruteni", "ruthenium", "nguyên tố ru", "z=44"],
    responses: [
        "🧪 RUTENI (Ru) - Z: 44 - Chu kỳ: 5 - Nhóm: VIII (8) - Khối lượng: 101.07 amu - e: [Kr] 4d7 5s1. Tính chất hóa học: Kim loại chuyển tiếp cứng giòn, trơ với axit thông thường, dễ tạo oxit RuO4. Công dụng: Tăng độ cứng cho bạch kim/paladi, đĩa cứng máy tính, chất xúc tác hóa học. Nguy hiểm: CỰC KỲ ĐỘC HẠI DẠNG OXIT (RuO4 bay hơi cực độc ăn mòn niêm mạc), kim loại khối an toàn."
    ]
},
{
    name: "element_rutherfordium",
    keywords: ["rutherfordi", "rutherfordium", "nguyên tố rf", "z=104"],
    responses: [
        "🧪 RUTHERFORDI (Rf) - Z: 104 - Chu kỳ: 7 - Nhóm: IVB (4) - Khối lượng: 267 amu - e: [Rn] 5f14 6d2 7s2. Tính chất hóa học: Kim loại chuyển tiếp phóng xạ nhân tạo siêu nặng, tính chất tương tự Hafni. Công dụng: Nghiên cứu khoa học hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ cao."
    ]},
{
    name: "element_samarium",
    keywords: ["samari", "samarium", "nguyên tố sm", "z=62"],
    responses: [
        "🧪 SAMARI (Sm) - Z: 62 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 150.36 amu - e: [Xe] 4f6 6s2. Tính chất hóa học: Kim loại đất hiếm ánh bạc, dễ bị oxy hóa trong không khí, phản ứng với nước loãng. Công dụng: Nam châm vĩnh cửu Samari-Cobalt chịu nhiệt độ cao, y học hạt nhân điều trị ung thư xương. Nguy hiểm: ĐỘC NHẸ ĐẾN TRUNG BÌNH, bụi Samari có nguy cơ gây cháy nổ và kích ứng da mắt."
    ]
},
{
    name: "element_scandium",
    keywords: ["scandi", "scandium", "nguyên tố sc", "z=21"],
    responses: [
        "🧪 SCANDI (Sc) - Z: 21 - Chu kỳ: 4 - Nhóm: IIIB (3) - Khối lượng: 44.956 amu - e: [Ar] 3d1 4s2. Tính chất hóa học: Kim loại chuyển tiếp mềm nhẹ, bị oxy hóa đổi màu trong không khí, tan trong axit. Công dụng: Hợp kim Nhôm-Scandi chế tạo khung xe đạp đua, gậy bóng chày, linh kiện máy bay MIG. Nguy hiểm: AN TOÀN THỂ KHỐI, hợp chất dạng hơi/bụi gây kích ứng phổi và gan."
    ]
},
{
    name: "element_seaborgium",
    keywords: ["seaborgi", "seaborgium", "nguyên tố sg", "z=106"],
    responses: [
        "🧪 SEABORGI (Sg) - Z: 106 - Chu kỳ: 7 - Nhóm: VIB (6) - Khối lượng: 269 amu - e: [Rn] 5f14 6d4 7s2. Tính chất hóa học: Nguyên tố phóng xạ siêu nặng nhân tạo, tính chất tương tự Vonfram. Công dụng: Duy nhất nghiên cứu vật lý hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã phóng xạ cực nhanh."
    ]
},
{
    name: "element_selenium",
    keywords: ["selen", "selenium", "nguyên tố se", "z=34"],
    responses: [
        "🧪 SELEN (Se) - Z: 34 - Chu kỳ: 4 - Nhóm: VIA (16) - Khối lượng: 78.971 amu - e: [Ar] 3d10 4s2 4p4. Tính chất hóa học: Á kim có tính dẫn điện tăng khi chiếu sáng (quang dẫn), tạo muối Selenit. Công dụng: Màn hình máy photo copy, pin mặt trời, dầu gội trị gàu, vi chất dinh dưỡng. Nguy hiểm: ĐỘC HẠI NẾU DÙNG QUÁ LIỀU, ngộ độc Selen gây rụng tóc, hỏng móng tay và tổn thương thần kinh."
    ]
},
{
    name: "element_silicon",
    keywords: ["silic", "silicon", "silici", "nguyên tố si", "z=14"],
    responses: [
        "🧪 SILIC (Si) - Z: 14 - Chu kỳ: 3 - Nhóm: IVA (14) - Khối lượng: 28.085 amu - e: [Ne] 3s2 3p2. Tính chất hóa học: Á kim bán dẫn phổ biến thứ 2 trên vỏ Trái Đất, trơ ở nhiệt độ thường, tan trong kiềm mạnh. Công dụng: Chip vi xử lý máy tính, tấm pin năng lượng mặt trời, Thủy tinh, Keo Silicone. Nguy hiểm: AN TOÀN TRONG SẢN PHẨM, nhưng hít phải bụi Silic (thạch anh) gây bệnh bụi phổi Silic mãn tính."
    ]
},
{
    name: "element_silver",
    keywords: ["bạc", "bac", "silver", "argentum", "nguyên tố ag", "z=47"],
    responses: [
        "🧪 BẠC (Ag) - Z: 47 - Chu kỳ: 5 - Nhóm: IB (11) - Khối lượng: 107.87 amu - e: [Kr] 4d10 5s1. Tính chất hóa học: Kim loại quý dẫn điện và dẫn nhiệt tốt nhất, không bị oxy hóa nhưng bị đen bởi H2S. Công dụng: Trang sức, tiền xu, vi mạch điện tử cao cấp, gương phẳng, chất kháng khuẩn y tế. Nguy hiểm: AN TOÀN, nhưng nhiễm độc Bạc lâu ngày gây bệnh Argyria (da hóa xanh xám vĩnh viễn)."
    ]
},
{
    name: "element_sodium",
    keywords: ["natri", "sodium", "natrium", "nguyên tố na", "z=11"],
    responses: [
        "🧪 NATRI (Na) - Z: 11 - Chu kỳ: 3 - Nhóm: IA (1) - Khối lượng: 22.990 amu - e: [Ne] 3s1. Tính chất hóa học: Kim loại kiềm cực mềm, tính khử rất mạnh, phản ứng mãnh liệt nổ bốc cháy với nước. Công dụng: Muối ăn (NaCl), xà phòng, đèn đường Natri vàng, chất làm mát lò phản ứng hạt nhân. Nguy hiểm: CỰC KỲ NGUY HIỂM Ở DẠNG KIM LOẠI (gây nổ bốc cháy khi gặp nước), ion Na+ là chất điện giải thiết yếu."
    ]
},
{
    name: "element_strontium",
    keywords: ["stronti", "strontium", "nguyên tố sr", "z=38"],
    responses: [
        "🧪 STRONTI (Sr) - Z: 38 - Chu kỳ: 5 - Nhóm: IIA (2) - Khối lượng: 87.62 amu - e: [Kr] 5s2. Tính chất hóa học: Kim loại kiềm thổ phản ứng mạnh với nước và không khí, cháy tỏa ánh sáng đỏ rực. Công dụng: Pháo hoa màu đỏ thắm, pháo sáng cứu hộ, đồng hồ nguyên tử siêu chính xác. Nguy hiểm: ĐỘC HẠI KHI LÀ ĐỒNG VỊ PHÓNG XẠ (Sr-90 thay thế Canxi trong xương gây ung thư), Strontium tự nhiên ít độc."
    ]
},
{
    name: "element_sulfur",
    keywords: ["lưu huỳnh", "luu huynh", "sulfur", "sulphur", "nguyên tố s", "z=16"],
    responses: [
        "🧪 LƯU HUỲNH (S) - Z: 16 - Chu kỳ: 3 - Nhóm: VIA (16) - Khối lượng: 32.06 amu - e: [Ne] 3s2 3p4. Tính chất hóa học: Phi kim màu vàng giòn, cháy trong không khí tạo khí SO2 có mùi hắc, phản ứng với kim loại. Công dụng: Sản xuất Axit Sulfuric (H2SO4), lưu hóa cao su lốp xe, thuốc lá, thuốc trừ sâu. Nguy hiểm: AN TOÀN DẠNG NGUYÊN TỐ, nhưng khí SO2/H2S từ lưu huỳnh cực độc, gây mưa axit và ngạt thở."
    ]
},
{
    name: "element_tantalum",
    keywords: ["tantal", "tantalum", "nguyên tố ta", "z=73"],
    responses: [
        "🧪 TANTAL (Ta) - Z: 73 - Chu kỳ: 6 - Nhóm: VB (5) - Khối lượng: 180.95 amu - e: [Xe] 4f14 5d3 6s2. Tính chất hóa học: Kim loại chuyển tiếp trơ hóa học tuyệt vời, không bị ăn mòn bởi H2SO4 hay HNO3. Công dụng: Tụ điện Tantal trong smartphone/máy tính, khớp xương nhân tạo y tế, dụng cụ hóa chất. Nguy hiểm: AN TOÀN TƯƠNG ĐỐI, hoàn toàn tương thích sinh học với cơ thể con người."
    ]
},
{
    name: "element_technetium",
    keywords: ["techneti", "technetium", "nguyên tố tc", "z=43"],
    responses: [
        "🧪 TECHNETI (Tc) - Z: 43 - Chu kỳ: 5 - Nhóm: VIIB (7) - Khối lượng: 98 amu - e: [Kr] 4d5 5s2. Tính chất hóa học: Kim loại chuyển tiếp phóng xạ nhân tạo nhẹ nhất, tính chất tương tự Reni và Mangan. Công dụng: Chẩn đoán hình ảnh y học hạt nhân (Tc-99m chụp quét tim, xương, não). Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ, đòi hỏi quy trình bảo vệ nghiêm ngặt."
    ]
},
{
    name: "element_tellurium",
    keywords: ["telu", "tellurium", "nguyên tố te", "z=52"],
    responses: [
        "🧪 TELU (Te) - Z: 52 - Chu kỳ: 5 - Nhóm: VIA (16) - Khối lượng: 127.60 amu - e: [Kr] 4d10 5s2 5p4. Tính chất hóa học: Á kim giòn màu bạc, phản ứng với halogen và kim loại tạo Telurua. Công dụng: Đĩa quang CD/DVD ghi xóa, tấm pin năng lượng mặt trời CdTe, hợp kim cắt gọt. Nguy hiểm: ĐỘC HẠI, tiếp xúc liều nhỏ khiến hơi thở và cơ thể phát ra mùi tỏi cực kỳ nồng kéo dài hàng tháng."
    ]
},
{
    name: "element_tennessine",
    keywords: ["tennessine", "nguyên tố ts", "z=117"],
    responses: [
        "🧪 TENNESSINE (Ts) - Z: 117 - Chu kỳ: 7 - Nhóm: VIIA (17) - Khối lượng: 294 amu - e: [Rn] 5f14 6d10 7s2 7p5. Tính chất hóa học: Halogen siêu nặng nhân tạo, dự đoán có tính kim loại nhiều hơn phi kim. Công dụng: Nghiên cứu cấu trúc hạt nhân trong phòng thí nghiệm. Nguy hiểm: CỰC KỲ NGUY HIỂM do phân rã phóng xạ cực nhanh."
    ]
},
{
    name: "element_terbium",
    keywords: ["terbi", "terbium", "nguyên tố tb", "z=65"],
    responses: [
        "🧪 TERBI (Tb) - Z: 65 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 158.93 amu - e: [Xe] 4f9 6s2. Tính chất hóa học: Kim loại đất hiếm mềm xám bạc, bị oxy hóa chậm trong không khí. Công dụng: Chất huỳnh quang màu xanh lá trong màn hình TV, thiết bị phát siêu âm Terfenol-D. Nguy hiểm: ĐỘC NHẸ, bụi Terbi gây kích ứng niêm mạc và dễ bốc cháy."
    ]
},
{
    name: "element_thallium",
    keywords: ["tali", "thallium", "nguyên tố tl", "z=81"],
    responses: [
        "🧪 TALI (Tl) - Z: 81 - Chu kỳ: 6 - Nhóm: IIIA (13) - Khối lượng: 204.38 amu - e: [Xe] 4f14 5d10 6s2 6p1. Tính chất hóa học: Kim loại yếu cực kỳ mềm, bị oxy hóa nhanh tạo Tl2O, thay thế Kali trong sinh học. Công dụng: Độc diệt chuột (đã cấm), kính quang học chỉ số khúc xạ cao, cảm biến hồng ngoại. Nguy hiểm: MỘT TRONG NHỮNG KIM LOẠI ĐỘC NHẤT, gây rụng tóc toàn thân, tê liệt thần kinh và tử vong."
    ]
},
{
    name: "element_thorium",
    keywords: ["thori", "thorium", "nguyên tố th", "z=90"],
    responses: [
        "🧪 THORI (Th) - Z: 90 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 232.04 amu - e: [Rn] 6d2 7s2. Tính chất hóa học: Kim loại phóng xạ tự nhiên dồi dào, bị bao phủ bởi lớp oxit ThO2 bảo vệ. Công dụng: Nhiên liệu cho lò phản ứng hạt nhân thế hệ mới (an toàn hơn Urani), que hàn TIG. Nguy hiểm: CỰC KỲ NGUY HIỂM do tính phóng xạ tích tụ lâu dài gây ung thư phổi và xương."
    ]
},
{
    name: "element_thulium",
    keywords: ["tuli", "thulium", "nguyên tố tm", "z=69"],
    responses: [
        "🧪 TULI (Tm) - Z: 69 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 168.93 amu - e: [Xe] 4f13 6s2. Tính chất hóa học: Kim loại đất hiếm ít phổ biến nhất, phản ứng chậm với nước, tan trong axit. Công dụng: Máy X-quang di động công nghiệp, laser phẫu thuật y tế Holmium-Thulium. Nguy hiểm: ĐỘC NHẸ, hợp chất Tuli tan có thể kích ứng da và có rủi ro cháy nổ."
    ]
},
{
    name: "element_tin",
    keywords: ["thiếc", "thiec", "tin", "stannum", "nguyên tố sn", "z=50"],
    responses: [
        "🧪 THIẾC (Sn) - Z: 50 - Chu kỳ: 5 - Nhóm: IVA (14) - Khối lượng: 118.71 amu - e: [Kr] 4d10 5s2 5p2. Tính chất hóa học: Kim loại yếu mềm dẻo, chống ăn mòn tốt, bị biến chất thành bột xám ở nhiệt độ lạnh (sâu thiếc). Công dụng: Tráng lon thực phẩm (sắt tây), dây hàn điện tử, hợp kim đồng thau/đồng điếu. Nguy hiểm: AN TOÀN Ở DẠNG KIM LOẠI, nhưng hợp chất thiếc hữu cơ rất độc hại với hệ thần kinh."
    ]
},
{
    name: "element_titanium",
    keywords: ["titan", "titanium", "nguyên tố ti", "z=22"],
    responses: [
        "🧪 TITAN (Ti) - Z: 22 - Chu kỳ: 4 - Nhóm: IVB (4) - Khối lượng: 47.867 amu - e: [Ar] 3d2 4s2. Tính chất hóa học: Kim loại chuyển tiếp nhẹ, siêu bền, chịu ăn mòn cực cao nhờ lớp oxit TiO2 bảo vệ. Công dụng: Vỏ máy bay, tàu vũ trụ, khớp xương nhân tạo y tế, sơn trắng (TiO2), gậy golf. Nguy hiểm: AN TOÀN HOÀN TOÀN TRONG CƠ THỂ, tuy nhiên bột Titan siêu mịn có nguy cơ cháy nổ cao."
    ]
},
{
    name: "element_tungsten",
    keywords: ["vonfram", "tungsten", "wolfram", "nguyên tố w", "z=74"],
    responses: [
        "🧪 VONFRAM (W) - Z: 74 - Chu kỳ: 6 - Nhóm: VIB (6) - Khối lượng: 183.84 amu - e: [Xe] 4f14 5d4 6s2. Tính chất hóa học: Kim loại chuyển tiếp có nhiệt độ nóng chảy cao nhất (3422 độ C), siêu cứng, kháng axit. Công dụng: Dây tóc bóng đèn tròn, mũi khoan siêu cứng (WC), đạn xuyên giáp, vòi phun tên lửa. Nguy hiểm: ÍT ĐỘC HẠI, nhưng bụi Vonfram gây kích ứng da mắt và tổn thương hô hấp."
    ]
},
{
    name: "element_uranium",
    keywords: ["urani", "uranium", "nguyên tố u", "z=92"],
    responses: [
        "🧪 URANI (U) - Z: 92 - Chu kỳ: 7 - Nhóm: Actini - Khối lượng: 238.03 amu - e: [Rn] 5f3 6d1 7s2. Tính chất hóa học: Kim loại phóng xạ tự nhiên nặng, bốc cháy ở dạng bột, tan trong axit loãng. Công dụng: Nhiên liệu chính nhà máy điện hạt nhân (U-235), vũ khí hạt nhân, đối trọng máy bay. Nguy hiểm: CỰC KỲ ĐỘC HẠI VÀ NGUY HIỂM, gây suy thận do độc tính kim loại nặng và ung thư do phóng xạ."
    ]
},
{
    name: "element_vanadium",
    keywords: ["vanadi", "vanadium", "nguyên tố v", "z=23"],
    responses: [
        "🧪 VANADI (V) - Z: 23 - Chu kỳ: 4 - Nhóm: VB (5) - Khối lượng: 50.942 amu - e: [Ar] 3d3 4s2. Tính chất hóa học: Kim loại chuyển tiếp cứng, tạo nhiều dung dịch màu sắc rực rỡ tương ứng các số oxy hóa. Công dụng: Thép Vanadi làm cờ-lê, dụng cụ sửa chữa, lò xo, chất xúc tác V2O5 sản xuất H2SO4. Nguy hiểm: ĐỘC HẠI DẠNG HƠI/OXIT (V2O5 gây tổn thương đường hô hấp, co thắt phế quản và dị ứng)."
    ]
},
{
    name: "element_xenon",
    keywords: ["xenon", "xennon", "nguyên tố xe", "z=54"],
    responses: [
        "🧪 XENON (Xe) - Z: 54 - Chu kỳ: 5 - Nhóm: VIIIA (18) - Khối lượng: 131.29 amu - e: [Kr] 4d10 5s2 5p6. Tính chất hóa học: Khí hiếm nặng, có thể tạo hợp chất với Flo và Oxy (như XeF2, XeO3) ở điều kiện đặc biệt. Công dụng: Đèn pha ô tô Xe-non siêu sáng, thuốc gây mê y tế, động cơ ion vệ tinh vũ trụ. Nguy hiểm: AN TOÀN KHI BÌNH THƯỜNG, nhưng gây ngạt thở và ngất xỉu nếu chiếm hết không khí."
    ]
},
{
    name: "element_ytterbium",
    keywords: ["yterbi", "ytterbium", "nguyên tố yb", "z=70"],
    responses: [
        "🧪 YTERBI (Yb) - Z: 70 - Chu kỳ: 6 - Nhóm: Lantan - Khối lượng: 173.05 amu - e: [Xe] 4f14 6s2. Tính chất hóa học: Kim loại đất hiếm mềm dễ uốn, bị oxy hóa chậm trong không khí, phản ứng với nước. Công dụng: Đồng hồ atomic siêu chính xác, sợi quang học laser, thiết bị đo địa chấn động đất. Nguy hiểm: ĐỘC NHẸ, bụi Yterbi gây kích ứng da mắt và là mối nguy cơ gây cháy nổ."
    ]
},
{
    name: "element_yttrium",
    keywords: ["ytri", "yttrium", "nguyên tố y", "z=39"],
    responses: [
        "🧪 YTRI (Y) - Z: 39 - Chu kỳ: 5 - Nhóm: IIIB (3) - Khối lượng: 88.906 amu - e: [Kr] 4d1 5s2. Tính chất hóa học: Kim loại chuyển tiếp đất hiếm, tương đối bền trong không khí nhờ lớp oxit Y2O3. Công dụng: Đèn LED, chất siêu dẫn nhiệt độ cao YBCO, laser YAG dùng trong thẩm mỹ và y tế. Nguy hiểm: ĐỘC HẠI KHI HÍT PHẢI, bụi Ytri gây ung thư phổi và tổn thương gan."
    ]
},
{
    name: "element_zinc",
    keywords: ["kẽm", "kem", "zinc", "zincum", "nguyên tố zn", "z=30"],
    responses: [
        "🧪 KẼM (Zn) - Z: 30 - Chu kỳ: 4 - Nhóm: IIB (12) - Khối lượng: 65.38 amu - e: [Ar] 3d10 4s2. Tính chất hóa học: Kim loại chuyển tiếp, lưỡng tính (tan trong axit và kiềm mạnh), bị thụ động hóa. Công dụng: Mạ kẽm chống gỉ cho thép tôn, pin con thỏ, hợp kim đồng thau, vi chất dinh dưỡng. Nguy hiểm: AN TOÀN, nhưng hít phải hơi Kẽm khi hàn cắt kim loại gây sốt khói kim loại (Metal Fume Fever)."
    ]
},
{
    name: "element_zirconium",
    keywords: ["zirconi", "zirconium", "nguyên tố zr", "z=40"],
    responses: [
        "🧪 ZIRCONI (Zr) - Z: 40 - Chu kỳ: 5 - Nhóm: IVB (4) - Khối lượng: 91.224 amu - e: [Kr] 4d2 5s2. Tính chất hóa học: Kim loại chuyển tiếp kháng ăn mòn cực tốt, không hấp thụ nơ-tron (đúng hơn là quá ít không đáng kể). Công dụng: Bọc thanh nhiên liệu hạt nhân, răng sứ Zirconia, trang sức đá giả kim cương. Nguy hiểm: AN TOÀN THỂ KHỐI, nhưng bột Zirconi mịn tự bốc cháy cực kỳ mãnh liệt trong không khí."
    ]
},
{
    name: "concept_atom",
    keywords: ["nguyên tử", "nguyen tu", "khái niệm nguyên tử", "cấu tạo nguyên tử"],
    responses: [
        "NGUYÊN TỬ - Là hạt cực kỳ nhỏ bé và trung hòa về điện, cấu tạo nên mọi chất. Cấu trúc gồm hạt nhân ở tâm (chứa các hạt Proton mang điện dương và Neutron không mang điện) và vỏ electron (chứa các hạt Electron mang điện âm chuyển động xung quanh). Ví dụ: Một nguyên tử Hydro (H) gồm 1 proton và 1 electron."
    ]
},
{
    name: "concept_element",
    keywords: ["nguyên tố", "nguyên tố hóa học", "nguyen to", "nguyen to hoa hoc"],
    responses: [
        "NGUYÊN TỐ HÓA HỌC - Là tập hợp những nguyên tử cùng loại, có cùng số hạt Proton trong hạt nhân (cùng số hiệu nguyên tử Z). Các nguyên tử thuộc cùng một nguyên tố sẽ có tính chất hóa học giống nhau. Hiện nay có 118 nguyên tố đã được xác nhận. Ví dụ: Tất cả các nguyên tử có 6 proton đều thuộc nguyên tố Cacbon (C)."
    ]
},
{
    name: "concept_molecule",
    keywords: ["phân tử", "phan tu", "khái niệm phân tử"],
    responses: [
        "PHÂN TỬ - Là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau bằng liên kết hóa học và thể hiện đầy đủ tính chất hóa học của chất đó. Phân tử có thể do các nguyên tử cùng loại hoặc khác loại tạo nên. Ví dụ: Phân tử Oxy (O2) gồm 2 nguyên tử O liên kết với nhau, phân tử Nước (H2O) gồm 2 nguyên tử H và 1 nguyên tử O."
    ]
},
{
    name: "concept_simple_substance",
    keywords: ["đơn chất", "don chat", "khái niệm đơn chất"],
    responses: [
        "ĐƠN CHẤT - Là những chất được tạo nên từ chỉ MỘT nguyên tố hóa học. Đơn chất được chia thành đơn chất kim loại (như Sắt Fe, Đồng Cu) và đơn chất phi kim (như Khí Oxy O2, Khí Nitơ N2, Than C). Dù do 1 hay nhiều nguyên tử tạo thành thì chỉ cần chung 1 loại nguyên tố là đơn chất."
    ]
},
{
    name: "concept_compound",
    keywords: ["hợp chất", "hop chat", "khái niệm hợp chất"],
    responses: [
        "HỢP CHẤT - Là những chất được tạo nên từ HAO HOẶC NHIỀU nguyên tố hóa học khác nhau liên kết với nhau theo tỷ lệ xác định. Hợp chất gồm hợp chất vô cơ (như Nước H2O, Muối ăn NaCl, Axit Sulfuric H2SO4) và hợp chất hữu cơ (như Đường C12H22O11, Cồn C2H5OH, Mêtan CH4)."
    ]
},
{
    name: "concept_ion",
    keywords: ["ion", "khái niệm ion", "cation", "anion", "điện tích"],
    responses: [
        "ION - Là nguyên tử hay nhóm nguyên tử mang điện tích. Nguyên tử nhường electron sẽ trở thành ion dương (Cation, ví dụ: Na+), nguyên tử nhận electron sẽ trở thành ion âm (Anion, ví dụ: Cl-)."
    ]
},
{
    name: "concept_isotope",
    keywords: ["đồng vị", "dong vi", "khái niệm đồng vị"],
    responses: [
        "ĐỒNG VỊ - Là các nguyên tử thuộc cùng một nguyên tố hóa học, có cùng số proton (số Z) nhưng khác nhau về số neutron (số N), dẫn đến khối lượng nguyên tử (số A) khác nhau. Ví dụ: Nguyên tố Cacbon có các đồng vị C-12, C-13 và C-14."
    ]
},
{
    name: "concept_valence",
    keywords: ["hóa trị", "hoa tri", "khái niệm hóa trị"],
    responses: [
        "HÓA TRỊ - Là con số biểu thị khả năng liên kết của nguyên tử nguyên tố này với nguyên tử nguyên tố khác. Hóa trị của Hydro được chọn làm 1 đơn vị, hóa trị của Oxy được chọn làm 2 đơn vị."
    ]
},
{
    name: "concept_chemical_bond",
    keywords: ["liên kết hóa học", "lien ket hoa hoc", "liên kết cộng hóa trị", "liên kết ion"],
    responses: [
        "LIÊN KẾT HÓA HỌC - Là sự kết hợp giữa các nguyên tử để tạo thành phân tử hay tinh thể bền vững hơn. Hai loại liên kết phổ biến là liên kết cộng hóa trị (dùng chung electron) và liên kết ion (lực hút tĩnh điện giữa các ion trái dấu)."
    ]
},
{
    name: "concept_chemical_reaction",
    keywords: ["phản ứng hóa học", "phan ung hoa hoc", "biến đổi hóa học"],
    responses: [
        "PHẢN ỨNG HÓA HỌC - Là quá trình biến đổi từ chất này thành chất khác. Trong phản ứng hóa học, liên kết giữa các nguyên tử bị thay đổi làm cho chất này biến thành chất khác, nhưng tổng số nguyên tử của mỗi nguyên tố được bảo toàn."
    ]
},
{
    name: "concept_mixture",
    keywords: ["hỗn hợp", "hon hop", "khái niệm hỗn hợp", "chất tinh khiết"],
    responses: [
        "HỖN HỢP - Là hệ gồm hai hay nhiều chất trộn lẫn vào nhau nhưng không có liên kết hóa học giữa chúng và giữ nguyên tính chất riêng. Khác với hợp chất, thành phần hỗn hợp có thể thay đổi tùy ý. Ví dụ: Không khí, nước muối."
    ]
},
{
    name: "concept_solution",
    keywords: ["dung dịch", "dung dich", "chất tan", "dung môi"],
    responses: [
        "DUNG DỊCH - Là hỗn hợp đồng nhất giữa chất tan và dung môi. Chất tan có thể ở dạng rắn, lỏng hoặc khí được hòa tan hoàn toàn vào dung môi (thường là nước)."
    ]
},
{
    name: "concept_acid",
    keywords: ["axit", "acid", "khái niệm axit"],
    responses: [
        "AXIT - Là hợp chất mà phân tử gồm một hay nhiều nguyên tử Hydro liên kết với gốc axit. Khi phân ly trong nước tạo ra ion H+. Axit làm quỳ tím hóa đỏ và có vị chua. Ví dụ: HCl, H2SO4, CH3COOH."
    ]
},
{
    name: "concept_base",
    keywords: ["bazo", "bazơ", "base", "khái niệm bazo"],
    responses: [
        "BAZƠ - Là hợp chất mà phân tử gồm một nguyên tử kim loại liên kết với một hay nhiều nhóm Hydroxit (-OH). Khi phân ly trong nước tạo ra ion OH-. Bazơ làm quỳ tím hóa xanh và phenolphthalein hóa hồng. Ví dụ: NaOH, Ca(OH)2."
    ]
},
{
    name: "concept_salt",
    keywords: ["muối", "muoi", "khái niệm muối"],
    responses: [
        "MUỐI - Là hợp chất được tạo thành khi thay thế nguyên tử Hydro trong axit bằng nguyên tử kim loại (hoặc ion Ammonium NH4+). Phân tử muối gồm cation kim loại và anion gốc axit. Ví dụ: NaCl, CaCO3, CuSO4."
    ]
},
{
    name: "concept_oxide",
    keywords: ["oxit", "oxide", "khái niệm oxit"],
    responses: [
        "OXIT - Là hợp chất gồm hai nguyên tố, trong đó có một nguyên tố là Oxy. Oxit được chia thành oxit bazơ (Fe2O3, CaO), oxit axit (SO2, CO2), oxit lưỡng tính (Al2O3) và oxit trung tính (CO, NO)."
    ]
},
{
    name: "concept_mole",
    keywords: ["mol", "khái niệm mol", "hằng số avogadro"],
    responses: [
        "MOL - Là lượng chất có chứa 6.022 x 10^23 (hằng số Avogadro) hạt nguyên tử hoặc phân tử của chất đó. Khối lượng mol (g/mol) có trị số bằng khối lượng nguyên tử hoặc phân tử tính theo amu."
    ]
},
{
    name: "concept_allotrope",
    keywords: ["thù hình", "thu hinh", "dạng thù hình"],
    responses: [
        "THÙ HÌNH - Là hiện tượng một nguyên tố hóa học tồn tại dưới nhiều dạng đơn chất khác nhau do cấu trúc tinh thể hoặc số lượng nguyên tử liên kết khác nhau. Ví dụ: Kim cương, than chì và xơ-len đều là các dạng thù hình của Cacbon."
    ]
},
{
    name: "concept_molar_volume",
    keywords: ["thể tích mol", "the tich mol", "thể tích khí"],
    responses: [
        "THỂ TÍCH MOL CỦA CHẤT KHÍ - Là thể tích chiếm bởi 1 mol chất khí đó. Ở điều kiện chuẩn (25 độ C, 1 bar), 1 mol của bất kỳ chất khí nào cũng đều chiếm thể tích xấp xỉ 24.79 lít."
    ]
},
{
    name: "concept_concentration",
    keywords: ["nồng độ dung dịch", "nong do dung dich", "nồng độ phần trăm", "nồng độ mol"],
    responses: [
        "NỒNG ĐỘ DUNG DỊCH - Biểu thị lượng chất tan có trong một lượng dung dịch hoặc dung môi xác định. Hai loại phổ biến là nồng độ phần trăm (C% - khối lượng chất tan trong 100g dung dịch) và nồng độ mol (CM - số mol chất tan trong 1 lít dung dịch)."
    ]
},
{
    name: "concept_solubility",
    keywords: ["độ tan", "do tan", "khái niệm độ tan"],
    responses: [
        "ĐỘ TAN - Là khối lượng (tính bằng gam) của chất đó hòa tan trong 100g nước để tạo thành dung dịch bão hòa ở một nhiệt độ và áp suất xác định."
    ]
},
{
    name: "concept_saturated_solution",
    keywords: ["dung dịch bão hòa", "dung dịch chưa bão hòa", "dung dich bao hoa"],
    responses: [
        "DUNG DỊCH BÃO HÒA - Là dung dịch không thể hòa tan thêm chất tan đó ở một nhiệt độ xác định. Nồng độ chất tan lúc này đạt giá trị tối đa (bằng độ tan của chất)."
    ]
},
{
    name: "concept_catalyst",
    keywords: ["chất xúc tác", "chat xuc tac", "xúc tác"],
    responses: [
        "CHẤT XÚC TÁC - Là chất làm tăng tốc độ của phản ứng hóa học nhưng không bị tiêu hao hay biến đổi hóa học sau khi phản ứng kết thúc. Ví dụ: MnO2 làm xúc tác cho phản ứng phân hủy H2O2 thành O2 và H2O."
    ]
},
{
    name: "concept_electronegativity",
    keywords: ["độ âm điện", "do am dien"],
    responses: [
        "ĐỘ ÂM ĐIỆN - Là đại lượng đặc trưng cho khả năng hút electron của nguyên tử nguyên tố đó khi hình thành liên kết hóa học. Độ âm điện càng lớn thì tính phi kim càng mạnh."
    ]
},
{
    name: "concept_oxidation_state",
    keywords: ["số oxy hóa", "so oxy hoa", "số oxi hóa"],
    responses: [
        "SỐ OXY HÓA - Là điện tích giả định của nguyên tử trong phân tử nếu giả định rằng tất cả các liên kết trong phân tử đều là liên kết ion hoàn toàn."
    ]
},
{
    name: "concept_redox_reaction",
    keywords: ["phản ứng oxi hóa khử", "phan ung oxi hoa khu", "chất khử", "chất oxi hóa"],
    responses: [
        "PHẢN ỨNG OXI HÓA KHỬ - Là phản ứng hóa học trong đó có sự chuyển dịch electron giữa các chất phản ứng, dẫn đến sự thay đổi số oxi hóa của một hay nhiều nguyên tố."
    ]
},
{
    name: "concept_ph",
    keywords: ["ph", "độ ph", "chỉ số ph", "thang ph"],
    responses: [
        "ĐỘ PH - Là chỉ số đo độ axit hay độ bazơ của dung dịch nước. Thang pH có giá trị từ 0 đến 14: pH < 7 là môi trường axit, pH = 7 là trung tính, và pH > 7 là môi trường bazơ (kiềm)."
    ]
},
{name: "gay",
keywords: ["gay", "bro gay", "bạn gay", "mày gay"],
responses: ["Adimim của tôi có gay🗿🌚","Hỏi chi","🌚🖕"]},
{name: "whatwho",
keywords: ["hoạt động thế nào","ngu"],
responses: [`😭Tôi hoạt động theo kiểu đưa đáp án mà dev cung cấp. tôi không thể tạo đáp án mới ngoài dev cho đó là nguyên do hiến có vài câu trả lời bị lặp lại hoặc không đúng ý vì dev của tôi tránh đổi sự linh hoạt để lấy không "AI ảo" đây là code mẫu[ {name: "a",keywords: ["A"],responses: ["gì mà A vậy"]}], đó là dạng chứa từ khóa và câu trả lời cũng là dạng tôi đang dùng nhưng đa số thôi,nên nếu bạn bảo tôi ngu thì nói với dev của tôi á`]},
{name: "six_seven",
                keywords: ["six seven", "xix seven"],
                responses: [
                    "IM ĐI TREND NÀY TỪ 2025 RỒI, tôi bị dị ứng với six seven "
                ]
            },
            {
  name: "mh370",
  keywords: ["mh370"],
  responses: ["MH370 là chuyến bay của Malaysia Airlines mất liên lạc vào ngày 8 tháng 3 năm 2014 khi bay từ Kuala Lumpur đến Bắc Kinh với 239 người trên khoang. Dù nhiều cuộc tìm kiếm đã được thực hiện, đến nay vẫn chưa xác định được chính xác nơi máy bay rơi. Một số mảnh vỡ được xác nhận đã dạt vào bờ ở Ấn Độ Dương. Nguyên nhân chính xác vẫn chưa được kết luận."]}
        ];

        this.fallbackResponses = [
            "Tôi chưa chắc mình hiểu đúng ý. Bro có thể nói cụ thể hơn một chút không?",
            "Câu này tôi chưa có kiến thức đủ chắc. Tôi đã ghi nhận để có thể bổ sung sau.",
            "Tôi chưa tìm được ý định phù hợp. Thử hỏi về tiền, lúa, cá, NPC, ban đêm hoặc trạng thái nhân vật nhé."
        ];
    }

    normalize(text) {
        return String(text || "")
            .toLowerCase()
            .replace(/đ/g, "d")
            .replace(/[^\p{L}\p{N}\s?]/gu, " ")
            .replace(/\s+/g, " ")
            .trim();
    }
    canonical(text) {
        let t = this.normalize(text);
        for (const [from, to] of Object.entries(this.aliases)) {
            t = t.replace(new RegExp("\\b" + this.escapeRegExp(this.normalize(from)) + "\\b", "g"), this.normalize(to));
        }
        return t;
    }
    escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    tokenize(text) {
        return this.canonical(text)
            .split(/\s+/)
            .filter(Boolean)
            .filter(x => !this.stopWords.has(x));
    }

    similarity(a, b) {
        const A = new Set(this.tokenize(a));
        const B = new Set(this.tokenize(b));
        if (!A.size || !B.size) return 0;

        let common = 0;
        for (const word of A) {
            if (B.has(word)) common++;
        }

        return common / Math.max(A.size, B.size);
    }

    remember(userInput, reply, intentName, entity) {
        this.context.history.push({
            user: userInput,
            assistant: reply,
            intent: intentName,
            entity: entity || null,
            time: Date.now()
        });

        if (this.context.history.length > 12) {
            this.context.history.shift();
        }

        this.context.lastTopic = intentName || this.context.lastTopic;
        if (entity) this.context.lastEntity = entity;
    }

    findEntity(text) {
        const t = this.normalize(text);
        const entities = [
            ["ông bảy", ["ông bảy", "ong bay"]],["tám đen", ["tám đen", "tam den", "chủ nợ"]],["kiều my", ["kiều my", "kieu my", "tiệm tóc"]],["bách hóa", ["bách hóa", "bach hoa", "bhx"]],["công an", ["công an"]],["kỳ thủ ẩn danh", ["kỳ thủ", "cờ vua"]],["huaka'i pō", ["huakai", "huaka'i pō", "đoàn linh hồn"]]
        ];

        for (const [name, words] of entities) {
            if (words.some(w => t.includes(this.normalize(w)))) return name;
        }

        if (/\b(ông ấy|ông ta|người đó|anh ấy|cô ấy|bà ấy|họ)\b/.test(t)) {
            return this.context.lastEntity;
        }

        return null;
    }

    isQuestionAbout(text, words) {
        const t = this.normalize(text);
        return words.some(w => t.includes(this.normalize(w)));
    }

    detectIntent(text) {
        const normalized = this.canonical(text);
        const tokens = this.tokenize(normalized);

        if (this.isQuestionAbout(normalized, ["trạng thái", "tài sản", "kho đồ", "tôi có gì", "inventory"])) {
            return { intent: this.intents.find(x => x.name === "status"), score: 100 };
        }

        let best = null;
        let bestScore = 0;

        for (const intent of this.intents) {
            let score = 0;

            for (const keyword of intent.keywords) {
                const k = this.normalize(keyword);

                if (normalized.includes(k)) {
                    score += Math.min(12, k.length) + (k.includes(" ") ? 4 : 0);
                } else {
                    const kwTokens = k.split(/\s+/);
                    const overlap = kwTokens.filter(x => tokens.includes(x)).length;
                    if (overlap) score += overlap * 2;
                }
            }

            const recent = this.context.history.slice(-3);
            for (const item of recent) {
                if (item.intent === intent.name) score += 1;
            }

            if (score > bestScore) {
                bestScore = score;
                best = intent;
            }
        }

        if (!best) return null;

        return {
            intent: best,
            score: bestScore
        };
    }

    getGameData() {
        const inv = typeof inventory !== "undefined" ? inventory : null;
        const eco = typeof economy !== "undefined" ? economy : null;

        const game = typeof window !== "undefined" ? window.game : null;
        const player = game && game.player ? game.player : null;

        const data = {
            money: inv ? Number(inv.money || 0) : null,
            debt: inv ? Number(inv.debt || 0) : null,
            seeds: inv ? Number(inv.seeds || 0) : null,
            rice: inv ? Number(inv.rice || 0) : null,
            fish: inv ? Number(inv.fish || 0) : null,
            noodles: inv ? Number(inv.noodles || 0) : null,
            appliances: inv ? Number(inv.appliances || 0) : null,
            day: eco ? Number(eco.day || 1) : null,
            inflation: eco ? Number(eco.inflation || 1) : null,
            currentPrice: eco && eco.currentPrice ? eco.currentPrice : {},
            player: player
        };

        if (game && game.player && game.player.health != null) {
            data.health = Number(game.player.health);
        }

        return data;
    }

    formatMoney(value) {
        return Number(value || 0).toLocaleString("vi-VN") + "đ";
    }

    getEconomicAdvice() {
        const d = this.getGameData();
if (d.money === null || d.debt === null) {return "/E: Error 404";}
        const lines = [
            `💰 Bạn đang có ${this.formatMoney(d.money)} và nợ ${this.formatMoney(d.debt)}.`
        ];

        if (d.debt > 0) {
            lines.push(`🎯 Mục tiêu gần nhất: giảm khoản nợ ${this.formatMoney(d.debt)}.`);
        } else {
            lines.push("🎯 Bạn đã hết nợ. Giờ có thể tích lũy tài sản.");
        }

        if (d.fish > 0) {
            lines.push(`🐟 Bạn có ${d.fish} cá, có thể bán để tạo dòng tiền.`);
        }

        if (d.rice > 0) {
            lines.push(`🌾 Bạn có ${d.rice} lúa, nên cân nhắc bán khi giá thuận lợi.`);
        }

        if (d.inflation !== null) {
            const pct = d.inflation * 100;
            if (d.inflation >= 3) {
                lines.push(`🚨 Lạm phát đang rất cao: ${pct.toFixed(0)}%. Hạn chế mua hàng không cần thiết.`);
            } else if (d.inflation >= 2) {
                lines.push(`⚠️ Lạm phát đang cao: ${pct.toFixed(0)}%. Ưu tiên bán hàng và giữ tiền.`);
            } else {
                lines.push(`📈 Lạm phát hiện khoảng ${pct.toFixed(0)}%, chưa ở mức cảnh báo cao.`);
            }
        }

        return lines.join("\n");
    }

    getFarmingAdvice() {
        const d = this.getGameData();

        if (d.seeds !== null && d.rice !== null) {
            return `🌾 Hiện bạn có ${d.seeds} hạt giống và ${d.rice} lúa. Dùng P để gieo hạt, sau đó chăm/thu hoạch và bán lúa để tăng tiền.`;
        }

        return "🌾 Dùng P để gieo hạt. Thu hoạch lúa rồi bán để kiếm tiền và trả nợ.";
    }
getGameStateSummary() {const d = this.getGameData();
if (d.money === null) {return "/E: Error 404";}
return [`hiện tại bạn đang có tiền là ${this.formatMoney(d.money)}, đang nợ ${this.formatMoney(d.debt)}, hạt giống hiện tại là ${d.seeds}, lúa còn ${d.rice}, số cá có được ${d.fish}, mì gói còn ${d.noodles} gói, đồ gia dụng đang có là ${d.appliances} món, ngày trong game là ${d.day} lạm phát đang là ${d.inflation !== null ? (d.inflation * 100).toFixed(0) + "%" : "?"} Nói chung bro có bao nhiêu đây`];}

    getNPCInfo(text) {
        const entity = this.findEntity(text) || this.context.lastEntity;

        if (entity === "ông bảy") {
            return "🌾 Ông Bảy là thương lái chuyên thu mua lúa. Nếu bro hỏi về ông ấy thì tôi sẽ giữ ngữ cảnh này cho câu tiếp theo.";
        }

        if (entity === "tám đen") {
            return "🕵️ Tám Đen là chủ nợ của bạn. Khoản nợ ban đầu trong game là 20 triệu đồng.";
        }

        if (entity === "kiều my") {
            return "💇‍♀️ Kiều My gắn với tiệm tóc trong xã.";
        }

        if (entity === "bách hóa") {
            return "🛒 Bách Hóa là nơi mua các nhu yếu phẩm trong xã.";
        }

        if (entity === "công an") {
            return "🚔 Công an tuần tra để giữ trật tự trong xã.";
        }

        if (entity === "kỳ thủ ẩn danh") {
            return "♟️ Kỳ Thủ Ẩn Danh cho bạn cơ hội thách đấu Cờ Vua.";
        }

        return "Các NPC trong Phước Vinh 3D có thể được hỏi bằng tên. Ví dụ: 'Ông Bảy bán gì?' hoặc 'ông ấy ở đâu?'.";
    }

    answerEntityQuestion(text, entity) {
        const t = this.normalize(text);

        if (!entity) return null;

        if (entity === "ông bảy") {
            if (this.isQuestionAbout(t, ["mua gì", "mua gi", "bán gì", "ban gi", "thu mua"])) {
                return "🌾 Ông Bảy là thương lái thu mua lúa. Nếu bạn đang có nhiều lúa, hãy cân nhắc bán cho ông ấy.";
            }
            if (this.isQuestionAbout(t, ["ở đâu", "o dau", "đâu", "dau", "vị trí", "vi tri"])) {
                return "📍 Ông Bảy là NPC trong khu vực làng/chợ của Phước Vinh 3D.";
            }
        }

        if (entity === "tám đen") {
            if (this.isQuestionAbout(t, ["nợ bao nhiêu", "no bao nhieu", "bao nhiêu", "bao nhieu"])) {
                const d = this.getGameData();
                return `💳 Khoản nợ hiện tại của bạn là ${this.formatMoney(d.debt)}.`;
            }
        }

        if (entity === "kỳ thủ ẩn danh" && this.isQuestionAbout(t, ["cờ", "đánh", "elo", "thách đấu"])) {
            return "♟️ Bạn có thể lại gần Kỳ Thủ Ẩn Danh rồi tương tác để thách đấu.";
        }

        return null;
    }

    answerCompoundQuestion(text) {
        const t = this.normalize(text);
        const parts = [];

        if (this.isQuestionAbout(t, ["bao nhiêu tiền", "tôi có bao nhiêu", "tien"])) {
            parts.push(this.getGameStateSummary());
        }

        if (this.isQuestionAbout(t, ["kiếm tiền", "lam giau", "làm giàu", "tra no", "trả nợ"])) {
            parts.push(this.getEconomicAdvice());
        }

        if (this.isQuestionAbout(t, ["lúa", "lua", "trồng", "trong"])) {
            parts.push(this.getFarmingAdvice());
        }
        return parts.length ? parts.join("\n\n") : null;
    }
getNowInfo() {const now = new Date();
const weekdays = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư","Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const pad = n => String(n).padStart(2,"0");
const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
const ms = String(now.getMilliseconds()).padStart(3,"0");
const d = this.getGameData();
let result = [`Hôm nay là ${weekdays[now.getDay()]}, ngày ${date} ${pad(now.getHours())} giờ ${pad(now.getMinutes())} phút ${pad(now.getSeconds())} giây ${ms} mili giây theo giờ trên thiết bị.`];
if (d.day !== null) result.push(`Ngày kinh tế trong game: ngày ${d.day}.`);
return result.join("\n");}
looksLikeDateTimeQuestion(text) {const t = this.normalize(text);return ["hôm nay", "hom nay", "bây giờ", "bay gio","mấy giờ", "may gio", "giờ nào", "gio nao","ngày mấy", "ngay may", "thứ mấy", "thu may","ngày hôm nay", "date", "time", "today"].some(x => t.includes(this.normalize(x)));}

    cleanMathExpression(text) {
        let t = String(text || "").toLowerCase();

        t = t
            .replace(/bao nhiêu|bằng bao nhiêu|bang bao nhieu|=|tính|tinh|kết quả|ket qua|là gì|la gi|bằng|bang/g, " ")
            .replace(/căn bậc hai|can bac hai/g, "sqrt")
            .replace(/căn|can/g, "sqrt")
            .replace(/mũ|mu/g, "^")
            .replace(/phần trăm|phan tram/g, "%")
            .replace(/×|x/g, "*")
            .replace(/÷/g, "/")
            .replace(/,/g, ".")
            .replace(/:/g, "/")
            .replace(/\s+/g, "");

        return t;
    }

    isMathQuestion(text) {
        const t = this.normalize(text);
        if (!/[0-9]/.test(t)) return false;

        const mathWords = [
            "cộng", "cong", "trừ", "tru", "nhân", "nhan",
            "chia", "chia het", "mũ", "mu", "phần trăm", "phan tram",
            "tính", "tinh", "bao nhiêu", "bằng", "bang",
            "sqrt", "căn", "can", "!", "+", "-", "*", "/", "%", "^"
        ];

        return mathWords.some(x => t.includes(this.normalize(x)));
    }

    tokenizeMath(expr) {
        const tokens = [];
        let i = 0;

        while (i < expr.length) {
            const ch = expr[i];

            if (/\d|\./.test(ch)) {
                let num = "";
                while (i < expr.length && /[\d.]/.test(expr[i])) {
                    num += expr[i++];
                }
                if ((num.match(/\./g) || []).length > 1 || num === ".") {
                    throw new Error("Số không hợp lệ");
                }
                tokens.push({ type: "number", value: Number(num) });
                continue;
            }

            if (expr.startsWith("sqrt", i)) {
                tokens.push({ type: "func", value: "sqrt" });
                i += 4;
                continue;
            }

            if ("+-*/%^()!".includes(ch)) {
                if (ch === "-" && (
                    tokens.length === 0 ||
                    ["operator", "leftParen"].includes(tokens[tokens.length - 1].type)
                )) {
                    tokens.push({ type: "operator", value: "u-" });
                } else if (ch === "(") {
                    tokens.push({ type: "leftParen", value: ch });
                } else if (ch === ")") {
                    tokens.push({ type: "rightParen", value: ch });
                } else if (ch === "!") {
                    tokens.push({ type: "factorial", value: ch });
                } else {
                    tokens.push({ type: "operator", value: ch });
                }
                i++;
                continue;
            }

            throw new Error("Ký tự toán học không được hỗ trợ");
        }

        return tokens;
    }

    evaluateMath(expression) {
        const tokens = this.tokenizeMath(this.cleanMathExpression(expression));
        const output = [];
        const operators = [];

        const precedence = {
            "u-": 5,
            "^": 4,
            "*": 3,
            "/": 3,
            "%": 3,
            "+": 2,
            "-": 2
        };

        const rightAssoc = new Set(["u-", "^"]);

        const applyOperator = op => {
            if (op === "u-") {
                if (output.length < 1) throw new Error("Thiếu số");
                output.push(-output.pop());
                return;
            }

            if (output.length < 2) throw new Error("Thiếu số");

            const b = output.pop();
            const a = output.pop();

            if (op === "+") output.push(a + b);
            else if (op === "-") output.push(a - b);
            else if (op === "*") output.push(a * b);
            else if (op === "/") {
                if (b === 0) throw new Error("Không thể chia cho 0");
                output.push(a / b);
            } else if (op === "%") {
                if (b === 0) throw new Error("Không thể chia cho 0");
                output.push(a % b);
            } else if (op === "^") {
                output.push(Math.pow(a, b));
            }
        };

        const applyFactorial = () => {
            if (output.length < 1) throw new Error("Thiếu số");
            const n = output.pop();

            if (!Number.isInteger(n) || n < 0 || n > 170) {
                throw new Error("Giai thừa chỉ hỗ trợ số nguyên từ 0 đến 170");
            }

            let result = 1;
            for (let i = 2; i <= n; i++) result *= i;
            output.push(result);
        };

        for (const token of tokens) {
            if (token.type === "number") {
                output.push(token.value);
            } else if (token.type === "func") {
                operators.push("sqrt");
            } else if (token.type === "factorial") {
                applyFactorial();
            } else if (token.type === "leftParen") {
                operators.push("(");
            } else if (token.type === "rightParen") {
                while (operators.length && operators[operators.length - 1] !== "(") {
                    const op = operators.pop();
                    if (op === "sqrt") {
                        if (output.length < 1) throw new Error("Thiếu số");
                        const n = output.pop();
                        if (n < 0) throw new Error("Không thể lấy căn số âm");
                        output.push(Math.sqrt(n));
                    } else {
                        applyOperator(op);
                    }
                }

                if (!operators.length) throw new Error("Ngoặc không cân");
                operators.pop();

                if (operators[operators.length - 1] === "sqrt") {
                    operators.pop();
                    if (output.length < 1) throw new Error("Thiếu số");
                    const n = output.pop();
                    if (n < 0) throw new Error("Không thể lấy căn số âm");
                    output.push(Math.sqrt(n));
                }
            } else if (token.type === "operator") {
                const current = token.value;

                while (operators.length && operators[operators.length - 1] !== "(") {
                    const top = operators[operators.length - 1];

                    if (top === "sqrt") break;

                    const shouldPop =
                        (!rightAssoc.has(current) && precedence[current] <= precedence[top]) ||
                        (rightAssoc.has(current) && precedence[current] < precedence[top]);

                    if (!shouldPop) break;
                    applyOperator(operators.pop());
                }

                operators.push(current);
            }
        }

        while (operators.length) {
            const op = operators.pop();
            if (op === "(") throw new Error("Ngoặc không cân");

            if (op === "sqrt") {
                if (output.length < 1) throw new Error("Thiếu số");
                const n = output.pop();
                if (n < 0) throw new Error("Không thể lấy căn số âm");
                output.push(Math.sqrt(n));
            } else {
                applyOperator(op);
            }
        }

        if (output.length !== 1 || !Number.isFinite(output[0])) {
            throw new Error("Biểu thức không hợp lệ");
        }

        return output[0];
    }

    getMathAnswer(text) {
        try {
            const result = this.evaluateMath(text);
            const pretty = Number.isInteger(result)
                ? result.toLocaleString("vi-VN")
                : result.toLocaleString("vi-VN", { maximumFractionDigits: 10 });

            return `Kết quả: ${pretty}`;
        } catch (error) {
            return null;
        }
    }

    answerGameReasoning(text) {
        const t = this.normalize(text);
        const d = this.getGameData();

        if (d.money === null) return null;

        if (
            t.includes("mua") &&
            (t.includes("duoc khong") || t.includes("được không") || t.includes("đủ không")) &&
            /\d/.test(t)
        ) {
            const match = t.match(/(\d+(?:[.,]\d+)?)\s*(?:đ|d|dong|đồng)?/);
            if (match) {
                const price = Number(match[1].replace(",", "."));
                if (Number.isFinite(price)) {
                    if (d.money >= price) {
                        return `Được. Bạn có ${this.formatMoney(d.money)}, món này giá ${this.formatMoney(price)}, còn lại ${this.formatMoney(d.money - price)}.`;
                    }
                    return `Không đủ. Bạn có ${this.formatMoney(d.money)} nhưng cần ${this.formatMoney(price)}, thiếu ${this.formatMoney(price - d.money)}.`;
                }
            }
        }

        if (t.includes("cần bao nhiêu") && (t.includes("trả nợ") || t.includes("het no") || t.includes("hết nợ"))) {
            return `🧠 Bạn còn cần ${this.formatMoney(d.debt)} để trả hết nợ.`;
        }

        if (t.includes("có đủ") && t.includes("trả nợ")) {
            if (d.money >= d.debt) {
                return `🧠 Có. Bạn có ${this.formatMoney(d.money)} và nợ ${this.formatMoney(d.debt)}. Nếu trả toàn bộ, còn ${this.formatMoney(d.money - d.debt)}.`;
            }
            return `🧠 Chưa đủ. Bạn có ${this.formatMoney(d.money)}, còn thiếu ${this.formatMoney(d.debt - d.money)} để trả hết nợ.`;
        }

        if (t.includes("giàu") || t.includes("kiếm tiền nhanh") || t.includes("làm giàu")) {
            const advice = [];
            if (d.fish > 0) advice.push(`bán ${d.fish} cá đang có`);
            if (d.rice > 0) advice.push(`bán ${d.rice} lúa khi giá phù hợp`);
            if (d.debt > 0) advice.push(`ưu tiên giảm khoản nợ ${this.formatMoney(d.debt)}`);
            if (d.inflation >= 3) advice.push("hạn chế mua hàng vì lạm phát đang rất cao");
return advice.length ? `Dựa trên dữ liệu game hiện tại: ${advice.join("; ")}.`
: "Hiện tôi chưa thấy nguồn tài sản đủ rõ để tối ưu chiến lược.";}
if (t.includes("lạm phát") && (t.includes("cao") || t.includes("sao"))) {const pct = d.inflation !== null ? d.inflation * 100 : null;
if (pct !== null) {return `Lạm phát hiện khoảng ${pct.toFixed(0)}%. ${d.inflation >= 3 ? "Đây là mức rất cao, nên ưu tiên bán tài sản và hạn chế mua đồ không cần thiết." : "Mức này chưa vượt ngưỡng cảnh báo 300%."}`;}}return null;}
sendToFormspree(userInput) { return false; }
processInput(userInput) {if (typeof userInput !== "string") {return "Bạn hãy nhập câu hỏi nhé!";}
const raw = userInput.trim();
if (!raw) {return "Bạn muốn hỏi gì?";}
this.context.chatCount++;
if (this.looksLikeDateTimeQuestion(raw)) {const reply = this.getNowInfo();this.remember(raw, reply, "datetime", null);return reply;}
if (this.isMathQuestion(raw)) {const mathReply = this.getMathAnswer(raw);if (mathReply) {this.remember(raw, mathReply, "math", null);return mathReply;}}
const gameReasoning = this.answerGameReasoning(raw);if (gameReasoning) {this.remember(raw, gameReasoning,"game_reasoning",this.findEntity(raw));return gameReasoning;}
const entity = this.findEntity(raw);
const entityAnswer = this.answerEntityQuestion(raw, entity);
if (entityAnswer) {this.remember(raw, entityAnswer, "entity_question", entity);return entityAnswer;}
const compoundAnswer = this.answerCompoundQuestion(raw);
if (compoundAnswer) {this.remember(raw, compoundAnswer, "compound", entity);return compoundAnswer;}
const detected = this.detectIntent(raw);
if (detected && detected.score >= 2) {const intent = detected.intent; let reply;
if (intent.handler) {reply = intent.handler(raw);} else {reply = intent.responses[Math.floor(Math.random() * intent.responses.length)];}
this.remember(raw, reply, intent.name, entity);return reply;}
const previous = this.context.history[this.context.history.length - 1];
if (previous && this.similarity(raw, previous.user) > 0.45) {const reply = "Tôi hiểu bạn đang hỏi tiếp chủ đề vừa rồi, nhưng cần thêm chi tiết để trả lời chính xác hơn.";
this.remember(raw, reply, "clarification", entity || this.context.lastEntity);return reply;}
if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("pv3d-ai-unanswered", {detail: {question: raw}}));
const reply = this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
this.remember(raw, reply, "fallback", entity);return reply;}}
if (typeof window !== "undefined") {window.OfflineAIEngine = OfflineAIEngine;}
class AIChat {constructor() {this.aiEngine = new OfflineAIEngine();this.init();}
init() {this.setupHUDChat();}
setupHUDChat() {}
getReply(text) {return this.aiEngine.processInput(text);}}
if (typeof window !== "undefined") {window.addEventListener("load", () => {if (!window.aiChat) {window.aiChat = new AIChat();}});}
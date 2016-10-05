// Configure logger for event logging
var logger = new Logger('Managers:Abstracts');
// Comment out to use global logging level
Logger.setLevel('Managers:Abstracts', 'trace');
//Logger.setLevel('Managers:Abstracts', 'debug');
// Logger.setLevel('Managers:Abstracts', 'info');
//Logger.setLevel('Managers:Abstracts', 'warn');

Abstracts = new Mongo.Collection('abstracts');

Abstract = function(abstractID, content, title) {
    this.abstractID = abstractID;
    this.content = content;
    this.title = title,
    this.seenBy = [];
}

AbstractManager = (function() {
    return {
        markSeenBy: function(abstractID, userName) {
            Abstracts.update({_id: abstractID}, {$addToSet: {seenBy: userName}});
        },
    };
}());

abstracts = [
  {
    "abstract": "This system creates a manageable information resource that enables more complete and accurate interpretation, assessment and diagnosis of human behavior in constrained physical spaces. Through activity and environmental monitoring, a continuous, voluminous audio and video record is captured. Through work in information extraction, behavior analysis and synthesis, this record is transformed into an information asset whose efficient, secure presentation empowers specialists with greater insights into problems, effectiveness of treatments, and determination of environmental and social influences. Application environments range from nursery schools to nursing homes. The foundation for this work, the Informedia Digital Video Library [I], has demonstrated the successful integration of speech, image, and natural language processing in automatically creating an indexed, searchable multimedia information resource for broadcast-quality video, upon which this system builds..",
    "ID": "Wactlar2003",
    "title": "A System of Video Information Capture , Indexing and Retrieval for Interpreting Human Activity"
  },
  {
    "abstract": "CareMedia is a collaborative effort that to date has captured more than 13,000 hours of video and audio recordings of life in the shared spaces of a nursing home dementia unit, by using 23 ceiling-mounted cameras, 24 hours a day for 25 days, ensuring an un-occluded view of every point in the recorded space. Computer machine learning techniques are being applied to the resulting 25 Terabytes of data, automatically processing the record for efficient use by analytical observers (e.g., social and behavioral scientists, geriatricians, and healthcare policy makers) to monitor and understand residents' well-being, and enhance their quality of life. This truly interdisciplinary effort bridges the psychological, social and behavioral sciences, and clinical medicine with multiple engineering and computer science disciplines to establish a clinical evidence base to guide rational therapeutics, an elusive goal ardently articulated by the Institute of Medicine. This paper discusses early foundation work being conducted with the data.",
    "ID": "Stevens2006",
    "title": "Automatic collection, analysis, access, and archiving of individual and group psycho-social behavior"
  },
  {
    "abstract": "Content-based medical image retrieval (CBMIR) is an active research area for disease diagnosis and treatment but it can be problematic given the small visual variations between anatomical structures. We propose a retrieval method based on a bag-of-visual-words (BoVW) to identify discriminative characteristics between different medical images with Pruned Dictionary based on Latent Semantic Topic description. We refer to this as the PD-LST retrieval. Our method has two main components. First, we calculate a topic-word significance value for each visual word given a certain latent topic to evaluate how the word is connected to this latent topic. The latent topics are learnt, based on the relationship between the images and words, and are employed to bridge the gap between low-level visual features and high-level semantics. These latent topics describe the images and words semantically and can thus facilitate more meaningful comparisons between the words. Second, we compute an overall-word significance value to evaluate the significance of a visual word within the entire dictionary. We designed an iterative ranking method to measure overall-word significance by considering the relationship between all latent topics and words. The words with higher values are considered meaningful with more significant discriminative power in differentiating medical images. We evaluated our method on two public medical imaging datasets and it showed improved retrieval accuracy and efficiency.",
    "ID": "Zhang2016",
    "title": "Dictionary pruning with visual word significance for medical image retrieval"
  },
  {
    "abstract": "We describe an algorithm for dining activity analysis in a nursing home. Based on several features, including motion vectors and distance between moving regions in the subspace of an individual person, a hidden Markov model is proposed to characterize different stages in dining activities with certain temporal order. Using HMM model, we are able to identify the start (and ending) of individual dining events with high accuracy and low false positive rate. This approach could be successful in assisting caregivers in assessments of resident's activity levels over time.",
    "ID": "Gao1993",
    "title": "Dining Activity Analysis Using a Hidden Markov Model"
  },
  {
    "abstract": "This paper reports on the utility of gestures and speech to manipulate graphic objects. In the experiment described herein, three different populations of subjects were asked to communicate with a computer using either speech alone, gestures alone, or both. The task was the manipulation of a three-dimensional cube on the screen. They were asked to assume that the computer could see their hands, hear their voices, and understand their gestures and speech as well as a human could. A gesture classification scheme was developed to analyse the gestures of the subjects. A primary objective of the classification scheme was to determine whether common features would be found among the gestures of different users and classes of users. The collected data show a surprising degree of commonality among subjects in the use of gestures as well as speech. In addition to the uniformity of the observed manipulations, subjects expressed a preference for a combined gesture/speech interface. Furthermore, all subjects easily completed the simulated object manipulation tasks. The results of this research, and of future experiments of this type, can be applied to develop a gesture-based or gesture/speech-based system which enables computer users to manipulate graphic objects using easily learned and intuitive gestures to perform spatial tasks. Such tasks might include editing a three-dimensional rendering, controlling the operation of vehicles or operating virtual tools in three dimensions, or assembling an object from components. Knowledge about how people intuitively use gestures to communicate with computers provides the basis for future development of gesture-based input devices.",
    "ID": "Hauptmann1993",
    "title": "Gestures with speech for graphic manipulation"
  },
  {
    "abstract": "In order to improve the adaptive recognition abilities of picking robot in complex environment, a fusion approach of trinocular vision in wavelet domain based on fuzzy reasoning weight was proposed. Firstly, membership functions of fusion rules are determined by fuzzy reasoning of picking environmental features, and membership values of fusion types are calculated according to regional energy and match degree of origin images. Based on the maximum membership degree principle, fuzzy decision is carried on to determine the fusion types and fusion weight. Secondly, the mean weighted method and regional energy feature method are adopted respectively to carry on the low frequency as well as high frequency coefficients fusion among multi-source images by using two-level 2D wavelet, and the final fusion images are attained by inverse HIS transform based on inverse wavelet transform. Four groups of experiment show that in the complex picking environment like weak illumination and strong noise, the information entropy and average gradient of fused image that obtained by using the wavelet fusion method based on fuzzy reasoning weight are higher than that of traditional mean method, pyramid algorithm and wavelet packet method, which means that the fusion effect has been improved greatly.",
    "ID": "Liu2014",
    "title": "Study on Adaptive and Fuzzy Weighted Image Fusion Based on Wavelet Transform in Trinocular Vision of Picking Robot Fusion Model Basic Concepts"
  },
  {
    "abstract": "Multimedia event detection (MED) is a retrieval task with the goal of finding videos of a particular event in a large scale internet video archive, given example videos and text descriptions. Nowadays, different multimodal fusion schemes of low-level and high-level features are extensively investigated and evaluated for MED. For most of events in MED, people are usually the central subjects in videos. The face of a person can be considered as the most important factor which brings a lot of information describing the video events. However, face information has not been systematically investigated in the previous research for MED. In this paper, we investigate the possibility of using the high-level face information to assist multimedia event detection. Moreover, since the labeled data in TRECVID MED dataset are limited, we propose a semi-supervised kernel ridge regression which works well in practice to explore the useful information from unlabeled data to assist the event detection. Extensive experimental results on TRECVID MED dataset show that our proposed method outperforms the state-of- the-art methods by up to 4{\\%}.",
    "ID": "Liu",
    "title": "The Mystery of Faces : Investigating Face Contribution for Multimedia Event Detection"
  },
  {
    "abstract": "To detect errors when subjects operate a home medical device, we observe them with multiple cameras. We then perform action recognition with a robust approach to recognize action information based on explicitly encoding motion information. This algorithm detects interest points and encodes not only their local appearance but also explicitly models local motion. Our goal is to recognize individual human actions in the operations of a home medical device to see if the patient has correctly performed the required actions in the prescribed sequence. Using a specific infusion pump as a test case, requiring 22 operation steps from 6 action classes, our best classifier selects high likelihood action estimates from 4 available cameras, to obtain an average class recognition rate of 69{\\%}.",
    "ID": "Gao2010",
    "title": "Towards Automated Assistance for Operating Home Medical Devices"
  },
  {
    "abstract": "Content-based image retrieval (CBIR) has been applied to a variety of medical applications, e.g., pathology research and clinical decision support, and bag-of-features (BOF) model is one of the most widely used techniques. In this study, we address the problem of vocabulary pruning to reduce the influence from the redundant and noisy visual words. The conditional probability of each word upon the hidden topics extracted using probabilistic Latent Semantic Analysis (pLSA) is firstly calculated. A ranking method is then proposed to compute the significance of the words based on the relationship between the words and topics. Experiments on the publicly available Early Lung Cancer Action Program (ELCAP) database show that the method can reduce the number of words required while improving the retrieval performance. The proposed method is applicable to general image retrieval since it is independent of the problem domain. Keywords:",
    "ID": "Zhang",
    "title": "Ranking-based Vocabulary Pruning in Bag-of-Features for Image Retrieval"
  },
  {
    "abstract": "The lack of access to visual information like text labels, icons, and colors can cause frustration and decrease independence for blind people. Current access technology uses automatic approaches to address some problems in this space, but the technology is error-prone, limited in scope, and quite expensive. In this paper, we introduce VizWiz, a talking application for mobile phones that offers a new alternative to answering visual questions in nearly real-time - asking multiple people on the web. To support answering questions quickly, we introduce a general approach for intelligently recruiting human workers in advance called quikTurkit so that workers are available when new questions arrive. A field deployment with 11 blind participants illustrates that blind people can effectively use VizWiz to cheaply answer questions in their everyday lives, highlighting issues that automatic approaches will need to address to be useful. Finally, we illustrate the potential of using VizWiz as part of the participatory design of advanced tools by using it to build and evaluate VizWiz::LocateIt, an interactive mobile tool that helps blind people solve general visual search problems.",
    "ID": "Bigham2010",
    "title": "VizWiz: Nearly Real-Time Answers to Visual Questions"
  },
  {
    "abstract": "Images without alternative text are a barrier to equal web access for blind users. To illustrate the problem, we con- ducted a series of studies that conclusively show that a large fraction of significant images have no alternative text. To ameliorate this problem, we introduce WebInSight, a sys- tem that automatically creates and inserts alternative text into web pages on-the-fly. To formulate alternative text for images, we present three labeling modules based on web con- text analysis, enhanced optical character recognition (OCR) and human labeling. The system caches alternative text in a local database and can add new labels seamlessly after a web page is downloaded, resulting in minimal impact to the browsing experience. Categories",
    "ID": "Bigham",
    "title": "WebInSight : Making Web Images Accessible"
  },
  {
    "abstract": "Web browsing is inefficient for blind web users because of persistent accessibility problems, but the extent of these problems and their practical effects from the perspective of the user has not been sufficiently examined. We conducted a study in situ to investigate the accessibility of the web as experienced by web users. This remote study used an advanced web proxy that leverages AJAX technology to record both the pages viewed and the actions taken by users on the web pages that they visited. Our study was conducted remotely over the period of one week, and our participants used the assistive technology and software to which they were already accustomed and had already configured according to preference. These advantages allowed us to aggregate observations of many users and to explore the practical effects on and coping strategies employed by our blind participants. Our study reflects web accessibility from the perspective of web users and describes quantitative differences in the browsing behavior of blind and sighted web users. Categories",
    "ID": "Bighama",
    "title": "WebinSitu : A Comparative Analysis of Blind and Sighted Browsing Behavior"
  },
  {
    "abstract": "Audio CAPTCHAs were introduced as an accessible alternative for those unable to use the more common visual CAPTCHAs, but have been anecdotally thought to be more difficult to solve for some time. This paper demonstrates in a large study of more than 150 participants that existing audio CAPTCHAs are clearly more difficult and time-consuming to complete as compared to visual CAPTCHAs for both blind and sighted users. In order to address this concern, we developed and evaluated a new interface for solving CAPTCHAs optimized for non-visual use that can be added in-place to existing audio CAPTCHAs. In a subsequent study, the optimized interface increased the success rate of blind participants by 59{\\%} on audio CAPTCHAs, illustrating a broadly applicable principle of accessible design: the most usable audio interfaces are often not direct translations of existing visual interfaces.",
    "ID": "Bigham2009",
    "title": "Evaluating Existing Audio CAPTCHAs and an Interface Optimized for Non-Visual Use"
  },
  {
    "abstract": "In a new approach to large-scale extraction of facts from unstructured text, distributional similarities become an integral part of both the iterative acquisition of high-coverage contextual extraction pat- terns, and the validation and ranking of candidate facts. The evaluation measures the quality and coverage of facts extracted from one hundred million Web documents, starting from ten seed facts and using no additional knowledge, lexi- cons or complex tools.",
    "ID": "Pas2006",
    "title": "Names and Similarities on the Web : Fact Extraction in the Fast Lane"
  },
  {
    "abstract": "People often use computers other than their own to access web content, but blind users are restricted to using only computers equipped with expensive, special-purpose screen reading programs that they use to access the web. Web- Anywhere is a web-based, self-voicing web browser that en- ables blind web users to access the web from almost any computer that can produce sound without installing new software. The system could serve as a convenient, low-cost solution for blind users on-the-go, for blind users unable to afford a full screen reader and for web developers targeting accessible design. This paper overviews existing solutions for mobile web access for blind users and presents the de- sign of the WebAnywhere system. WebAnywhere generates speech remotely and uses prefetching strategies designed to reduce perceived latency. A user evaluation of the system is presented showing that blind users can use Web-Anywhere to complete tasks representative of what users might want to complete on computers that are not their own. A survey of public computer terminals shows that WebAnywhere can run on most. Categories",
    "ID": "Bigham2008",
    "title": "WebAnywhere : A Screen Reader On-the-Go"
  },
  {
    "abstract": "type) collectively caption speech in real-time on-demand. We present LEGION:SCRIBE, an end-to-end system that allows deaf people to request captions at any time. We introduce an algorithm for merging partial captions into a single out- put stream in real-time, and a captioning interface designed to encourage coverage of the entire audio stream. Evaluation with 20 local participants and 18 crowd workers shows that non-experts can provide an effective solution for captioning, accurately covering an average of 93.2{\\%} of an audio stream with only 10 workers and an average per-word latency of 2.9 seconds. More generally, our model in which multiple workers contribute partial inputs that are automatically merged in real-time may be extended to allow dynamic groups to surpass constituent individuals (even experts) on a variety of human performance tasks.",
    "ID": "Lasecki2012",
    "title": "Real-Time Captioning by Groups of Non-Experts"
  },
  {
    "abstract": "Our research is delivered as Portable Document Format (PDF) documents, and very few include basic metadata to make them accessible to people with disabilities. As a result, many people are either unable to read them efficiently or at all. Over the past few years, we have tried everything from writing guidelines and giving accessibility feedback, to enforcing accessibility standards and volunteering to make PDFs accessible ourselves. The problem with making PDFs accessible is in part due to the lack of good tools, but the complexity of the PDF format makes improving tools difficult. Making accessible research papers is as much about our choices as a community: our choice of publication format, and our choice to make accessibility a voluntary task for authors. In this paper, we overview the context in which PDFs became our publication format, the difficulty in making PDF documents accessible given current tools, what we have tried to make our PDFs more accessible, and potential options for doing better in the future.",
    "ID": "Bigham2016",
    "title": "An Uninteresting Tour Through Why Our Research Papers Aren't Accessible"
  },
  {
    "abstract": "Despite decades of research attempting to establish conversational interaction between humans and computers, the capabilities of automated conversational systems are still limited. In this paper, we introduce Chorus, a crowd-powered conversational assistant. When using Chorus, end users converse continuously with what appears to be a single conversational partner. Behind the scenes, Chorus leverages multiple crowd workers to propose and vote on responses. A shared memory space helps the dynamic crowd workforce maintain consistency, and a game-theoretic incentive mechanism helps to balance their efforts between proposing and voting. Studies with 12 end users and 100 crowd workers demonstrate that Chorus can provide accurate, topical responses, answering nearly 93{\\%} of user queries appropriately, and staying on-topic in over 95{\\%} of responses. We also observed that Chorus has ad- vantages over pairing an end user with a single crowd worker and end users completing their own tasks in terms of speed, quality, and breadth of assistance. Chorus demonstrates a new future in which conversational assistants are made us- able in the real world by combining human and machine intelligence, and may enable a useful new way of interacting with the crowds powering other systems. Author",
    "ID": "Lasecki2013",
    "title": "Chorus : A Crowd-Powered Conversational Assistant"
  },
  {
    "abstract": "The physical constraints of smartwatches limit the range and complexity of tasks that can be completed. Despite interface improvements on smartwatches, the promise of enabling productive work remains largely unrealized. This paper presents WearWrite, a system that enables users to write documents from their smartwatches by leveraging a crowd to help trans- late their ideas into text. WearWrite users dictate tasks, respond to questions, and receive notifications of major edits on their watch. Using a dynamic task queue, the crowd receives tasks issued by the watch user and generic tasks from the system. In a week-long study with seven smartwatch users supported by approximately 29 crowd workers each, we validate that it is possible to manage the crowd writing process from a watch. Watch users captured new ideas as they came to mind and managed a crowd during spare moments while go- ing about their daily routine. WearWrite represents a new approach to getting work done from wearables using the crowd.",
    "ID": "Nebeling2016",
    "title": "WearWrite: Crowd-Assisted Writing from Smartwatches"
  },
  {
    "abstract": "At least 10{\\%} of the global population has dyslexia. In the United States and Spain, dyslexia is associated with a large percentage of school drop out. Current methods to detect risk of dyslexia are language specific, expensive, or do not scale well because they require a professional or extensive equipment. A central challenge to detecting dyslexia is han- dling its differing manifestations across languages. To ad- dress this, we designed a browser-based game, Dytective, to detect risk of dyslexia across the English and Spanish lan- guages. Dytective consists of linguistic tasks informed by analysis of common errors made by persons with dyslexia. To evaluate Dytective, we conducted a user study with 60 English and Spanish speaking children between 7 and 12 years old. We found children with and without dyslexia dif- fered significantly in their performance on the game. Our results suggest that Dytective is able to differentiate school age children with and without dyslexia in both English and Spanish speakers. Categories",
    "ID": "Rello",
    "title": "Dytective : Towards Detecting Dyslexia Across Languages Using an Online Game"
  },
  {
    "abstract": "The authors present a time-delay neural network (TDNN) approach to phoneme recognition which is characterized by two important properties: (1) using a three-layer arrangement of simple computing units, a hierarchy can be constructed that allows for the formation of arbitrary nonlinear decision surfaces, which the TDNN learns automatically using error backpropagation; and (2) the time-delay arrangement enables the network to discover acoustic-phonetic features and the temporal relationships between them independently of position in time and therefore not blurred by temporal shifts in the input. As a recognition task, the speaker-dependent recognition of the phonemes B, D, and G in varying phonetic contexts was chosen. For comparison, several discrete hidden Markov models (HMM) were trained to perform the same task. Performance evaluation over 1946 testing tokens from three speakers showed that the TDNN achieves a recognition rate of 98.5{\\%} correct while the rate obtained by the best of the HMMs was only 93.7{\\%}",
    "ID": "Waibel1989",
    "title": "Phoneme recognition using time-delay neural networks"
  },
  {
    "abstract": "The paper explores several statistical pattern recognition techniques to classify utterances according to their emotional content. The authors have recorded a corpus containing emotional speech with over a 1000 utterances from different speakers. They present a new method of extracting prosodic features from speech, based on a smoothing spline approximation of the pitch contour. To make maximal use of the limited amount of training data available, they introduce a novel pattern recognition technique: majority voting of subspace specialists. Using this technique, they obtain classification performance that is close to human performance on the task",
    "ID": "Dellaert1996",
    "title": "Recognizing emotion in speech"
  },
  {
    "abstract": "Computer-assisted transcription promises high-quality speech transcription at reduced costs. This is achieved by limiting human effort to transcribing parts for which automatic transcription quality is insufficient. Our goal is to improve the human transcription quality via appropriate user interface design. We focus on iterative interfaces that allow humans to solve tasks based on an initially given suggestion, in this case an automatic transcription. We conduct a user study that reveals considerable quality gains for three variations of iterative interfaces over a non-iterative from-scratch transcription interface. Our iterative interfaces included post-editing, confidence-enhanced post-editing, and a novel retyping interface. All three yielded similar quality on average, but we found that the proposed retyping interface was less sensitive to the difficulty of the segment, and superior when the automatic transcription of the segment contained relatively many errors. An analysis using mixed-effects models allows us to quantify these and other factors and draw conclusions over which interface design should be chosen in which circumstance.",
    "ID": "Sperber",
    "title": "Optimizing Computer-Assisted Transcription Quality with Iterative User Interfaces"
  },
  {
    "abstract": "In this paper we describe our recent advances in LingWear, a wearable linguistic assistant for tourists. LingWear allows uninformed users to find their way in foreign cities or to ask for information about sightseeing, accommodations, and other places of interest. Moreover, the system allows the user to communicate with local residents through integrated speech-to-speech translation. Furthermore, the graphical user interface (GUI) of LingWear runs also on small hand-held devices (e.g. Compaq's iPAQ). In this client-server solution the main components of the system are running on a wireless connected server. The user can query LingWear either by means of spontaneous speech or via touch screen and receive the system's responds either by the integrated speech synthesis or by display messages. 1.",
    "ID": "Fugen",
    "title": "RECENT ADVANCES IN LINGWEAR : A WEARABLE LINGUISTIC ASSISTANT FOR TOURISTS Interactive Systems Labs University of Karlsruhe Am Fasanengarten 5 Carnegie Mellon University"
  },
  {
    "abstract": "Sentence segmentation and punctuation insertion in the output of automatic recognition systems is essential for its readability as well as for the performance of subsequent applications, such as machine translation systems. While a longer context can boost the accuracy of inserted punctuation marks, it drastically increases the delay in the spoken language translation system. In this work, we investigate the impact of shorter context in punctuation insertion task on simultaneous speech translation system. We suggest a new scheme within stream de- coding where the time delay consumed on punctuation pre- diction is avoided. Our evaluations on the English TED talks show that our suggested scheme can be used as an efficient method to punctuate recognized streams in real-time scenar- ios. While outperforming a conventional language model and prosody based punctuation prediction system, our model maintains a comparable performance compared to systems that require longer contexts. 1.",
    "ID": "Cho",
    "title": "Punctuation Insertion for Real-time Spoken Language Translation"
  },
  {
    "abstract": "Using the Internet for the collection of data is quite common these days. This process is called crowdsourcing and en- ables the collection of large amounts of data at reasonable costs. While being an inexpensive method, this data typically is of lower quality. Filtering data sets is therefore required. The occurring errors can be classified into different groups. There are technical issues and human errors. For speech recording, technical issues could be a noisy background. Human errors arise when the task is misunderstood. We employ several techniques for recognizing errors and eliminating faulty data sets in user input data for a Spoken Dialog System (SDS). Furthermore, we compare three different kinds of questionnaires (QNRs) for a given set of seven tasks. We analyze the characteristics of the resulting data sets and give a recommendation which type of QNR might be the most suitable one for a given purpose. 1",
    "ID": "Kilgour2015",
    "title": "A Neural Network Keyword Search System for Telephone Speech"
  },
  {
    "abstract": "Speech disfluencies are one of the main challenges of spoken language processing. Conventional disfluency detection systems deploy a hard decision, which can have a negative influence on subsequent applications such as machine translation. In this paper we suggest a novel approach in which disfluency detection is integrated into the translation process. We train a CRF model to obtain a disfluency probability for each word. The SMT decoder will then skip the potentially dis- fluent word based on its disfluency probability. Using the suggested scheme, the translation score of both the manual transcript and ASR output is improved by around 0.35 BLEU points compared to the CRF hard decision system. 1",
    "ID": "Cho2013",
    "title": "Tight Integration of Speech Disfluency Removal into SMT"
  },
  {
    "abstract": "In this paper we present our work in expanding the View4You system developed at the Interactive Systems Laboratories (ISL). The View4You system allows the user to retrieve automatically found news clips from recorded German broadcast news by natural spoken queries. While modular in design, so far, the architecture has required the components to at least run in a common file space. By utilizing Flash technology we turned this single machine setup into a distributed set-up that gives us access to our news database over the World Wide Web. The client side of our architecture only requires a web browser with Flash extension in order to record and send the speech of the queries to the servers and in order to display the retrieved news clips. Our future work will focus on turning the monolingual German system into a multilingual system that provides cross-lingual access and retrieval in multiple languages. Categories",
    "ID": "Stuker",
    "title": "Spoken News Queries over the World Wide Web Categories and Subject Descriptors"
  },
  {
    "abstract": "In this paper we describe our work in constructing a language identification system for use in our simultaneous lecture translation system. We first built PPR and PPRLM baseline systems that produce score-fusing language cue feature vectors for language discrimination and utilize an SVM back-end classifier for the actual language identification. On our bi-lingual lecture tasks the PPRLM system clearly outperforms the PPR system in various segment length conditions, however at the cost of slower run-time. By using lexical in- formation in the form of keyword spotting, and additional language models we show ways to improve the performance of both baseline systems. In order to combine the faster run-time of the PPR system with the better performance of the PPRLM system we finally built a hybrid of both approaches that clearly outperforms the PPR system while not adding any additional computing time. This hybrid system is therefore our choice for the use in the lecture translation system due to its faster run-time and good performance. Index",
    "ID": "Heck2012",
    "title": "A HYBRID PHONOTACTIC LANGUAGE IDENTIFICATION SYSTEM WITH AN SVM BACK-END FOR SIMULTANEOUS LECTURE TRANSLATION"
  },
  {
    "abstract": "People as news subjects carry rich semantics in broadcast news video and therefore finding a named person in the video is a major challenge for video retrieval. This task can be achieved by exploiting the multi-modal information in videos, including transcript, video structure, and visual features. We propose a comprehensive approach for finding specific persons in broadcast news videos by exploring various clues such as names occurred in the transcript, face information, anchor scenes, and most importantly, the timing pattern between names and people. Experiments on the TRECVID 2003 dataset show that our approach achieves high performance.",
    "ID": "Yang2004",
    "title": "Finding Person X : Correlating Names with Visual Appearances"
  }
];

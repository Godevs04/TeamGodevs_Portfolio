/**
 * Student / college project catalog.
 *
 * Edit this file to add, remove or re-price projects:
 *  - Prices come from PRICE_TIERS (tier 1 = ₹2,500 starting price).
 *  - Cover photos come from the domain (Unsplash, free licence); set `cover`
 *    on a project to use a different photo from COVER_PHOTOS.
 */

export type StudentDomain =
  | 'ai-ml'
  | 'deep-learning'
  | 'nlp'
  | 'data-science'
  | 'web'
  | 'mobile'
  | 'iot'
  | 'cyber'
  | 'blockchain'
  | 'cloud'
  | 'desktop';

export type StudentLevel = 'mini' | 'final-year';
export type PriceTier = 1 | 2 | 3 | 4;

export type StudentProject = {
  id: string;
  code: string;
  title: string;
  domain: StudentDomain;
  level: StudentLevel;
  tier: PriceTier;
  price: number;
  tech: string[];
  abstract: string;
  features: string[];
  popular: boolean;
  cover: CoverKey;
  note?: string;
};

/** Every project includes these three — the core student package. */
export const INCLUDED_DELIVERABLES = [
  {
    key: 'abstract',
    title: 'Abstract',
    description: 'Problem statement, objectives, scope and proposed system — ready for your guide.',
  },
  {
    key: 'documentation',
    title: 'Full documentation',
    description: 'Project report with literature survey, architecture & UML diagrams, modules, testing and screenshots.',
  },
  {
    key: 'source',
    title: 'Source code',
    description: 'Complete, working, commented source code with database / dataset and a setup guide.',
  },
] as const;

export const OPTIONAL_ADDONS = [
  'PPT for reviews & final viva',
  'Remote installation on your laptop',
  'Code walkthrough & viva Q&A prep',
  'Custom changes / extra modules',
];

export type PriceTierInfo = {
  price: number;
  label: string;
  /** Who / what this tier is for — shown in the "Pick by budget" row */
  description: string;
};

/** Charm pricing (₹x,499 / ₹x,999) — every project price comes from here. */
export const PRICE_TIERS: Record<PriceTier, PriceTierInfo> = {
  1: { price: 2499, label: 'Essential', description: 'Mini projects & classic CRUD apps' },
  2: { price: 3499, label: 'Standard', description: 'ML models, full web & mobile apps' },
  3: { price: 4499, label: 'Advanced', description: 'Deep learning, IoT & multi-module systems' },
  4: { price: 5999, label: 'Research-grade', description: 'Medical AI, blockchain & research topics' },
};

export const PRICE_TIER_IDS = [1, 2, 3, 4] as const satisfies readonly PriceTier[];

export const STARTING_PRICE = PRICE_TIERS[1].price;

/** College projects are usually done in teams — show the split as well. */
export const TEAM_SIZE = 4;
export const perPersonPrice = (price: number, teamSize = TEAM_SIZE) =>
  Math.ceil(price / teamSize);

export const LEVEL_LABELS: Record<StudentLevel, string> = {
  mini: 'Mini project',
  'final-year': 'Final year',
};

export const LEVEL_AUDIENCE: Record<StudentLevel, string[]> = {
  mini: ['BCA', 'B.Sc CS / IT', 'Diploma', 'B.E / B.Tech (2nd–3rd yr)'],
  'final-year': ['B.E / B.Tech', 'MCA', 'M.E / M.Tech', 'M.Sc CS / IT'],
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&h=450&q=70`;

export const COVER_PHOTOS = {
  ai: unsplash('photo-1677442136019-21780ecad995'),
  robot: unsplash('photo-1620712943543-bcc4688e7485'),
  vision: unsplash('photo-1535378620166-273708d44e4c'),
  chatbot: unsplash('photo-1531746790731-6c087fecd65a'),
  dashboard: unsplash('photo-1551288049-bebda4e38f71'),
  analytics: unsplash('photo-1460925895917-afdab827c52f'),
  code: unsplash('photo-1555949963-aa79dcee981c'),
  laptop: unsplash('photo-1498050108023-c5249f4df085'),
  editor: unsplash('photo-1461749280684-dccba630e2f6'),
  mobile: unsplash('photo-1551650975-87deedd944c3'),
  apps: unsplash('photo-1512941937669-90a1b58e7e9c'),
  arduino: unsplash('photo-1553406830-ef2513450d76'),
  circuit: unsplash('photo-1518770660439-4636190af475'),
  matrix: unsplash('photo-1526374965328-7f61d4dc18c5'),
  security: unsplash('photo-1550751827-4bd374c3f58b'),
  blockchain: unsplash('photo-1639762681485-074b7f938ba0'),
  crypto: unsplash('photo-1621761191319-c6fb62004040'),
  servers: unsplash('photo-1544197150-b99a580bb7a8'),
  network: unsplash('photo-1451187580459-43490279c0fa'),
  desk: unsplash('photo-1517694712202-14dd9538aa97'),
  health: unsplash('photo-1576091160399-112ba8d25d1d'),
  robotFace: unsplash('photo-1485827404703-89b55fcc595e'),
  mlPaper: unsplash('photo-1591453089816-0fbb971b454c'),
  pythonCode: unsplash('photo-1515879218367-8466d910aaa4'),
  codeGlasses: unsplash('photo-1504639725590-34d0984388bd'),
  darkLaptop: unsplash('photo-1484417894907-623942c8ee29'),
  codeScreen: unsplash('photo-1555066931-4365d14bab8c'),
  laptopCharts: unsplash('photo-1504868584819-f8e8b4b6d7e3'),
  dataViz: unsplash('photo-1666875753105-c63a6f3bdc86'),
  android: unsplash('photo-1607252650355-f7fd0460ccdb'),
  breadboard: unsplash('photo-1558346490-a72e53ae2d4f'),
  padlock: unsplash('photo-1614064641938-3bbee52942c7'),
  blocks: unsplash('photo-1639322537228-f710d846310a'),
  serverRack: unsplash('photo-1558494949-ef010cbdcc31'),
} as const;

export type CoverKey = keyof typeof COVER_PHOTOS;

export type DomainMeta = {
  id: StudentDomain;
  label: string;
  short: string;
  prefix: string;
  /** Rotated across the domain's projects */
  covers: CoverKey[];
  /** Tailwind gradient shown behind the photo (and as fallback if it fails) */
  gradient: string;
};

export const DOMAINS: DomainMeta[] = [
  { id: 'ai-ml', label: 'AI & Machine Learning', short: 'AI / ML', prefix: 'ML', covers: ['ai', 'mlPaper', 'robot'], gradient: 'from-violet-600 to-indigo-700' },
  { id: 'deep-learning', label: 'Deep Learning & Computer Vision', short: 'Computer Vision', prefix: 'CV', covers: ['vision', 'robotFace', 'robot'], gradient: 'from-fuchsia-600 to-purple-700' },
  { id: 'nlp', label: 'NLP & Chatbots', short: 'NLP', prefix: 'NLP', covers: ['chatbot', 'robotFace', 'pythonCode'], gradient: 'from-sky-600 to-indigo-700' },
  { id: 'data-science', label: 'Data Science & Analytics', short: 'Data Science', prefix: 'DS', covers: ['dashboard', 'dataViz', 'analytics', 'laptopCharts'], gradient: 'from-cyan-600 to-blue-700' },
  { id: 'web', label: 'Web Development', short: 'Web', prefix: 'WEB', covers: ['code', 'codeGlasses', 'laptop', 'codeScreen'], gradient: 'from-emerald-600 to-teal-700' },
  { id: 'mobile', label: 'Android & Mobile Apps', short: 'Mobile', prefix: 'APP', covers: ['mobile', 'android', 'apps'], gradient: 'from-green-600 to-emerald-700' },
  { id: 'iot', label: 'IoT & Embedded', short: 'IoT', prefix: 'IOT', covers: ['arduino', 'breadboard', 'circuit'], gradient: 'from-amber-600 to-orange-700' },
  { id: 'cyber', label: 'Cyber Security', short: 'Cyber Security', prefix: 'SEC', covers: ['matrix', 'padlock', 'security'], gradient: 'from-lime-600 to-green-800' },
  { id: 'blockchain', label: 'Blockchain & Web3', short: 'Blockchain', prefix: 'BC', covers: ['blockchain', 'blocks', 'crypto'], gradient: 'from-blue-600 to-violet-700' },
  { id: 'cloud', label: 'Cloud & DevOps', short: 'Cloud', prefix: 'CLD', covers: ['servers', 'serverRack', 'network'], gradient: 'from-slate-600 to-sky-800' },
  { id: 'desktop', label: 'Python / Java Applications', short: 'Python / Java', prefix: 'APPX', covers: ['desk', 'pythonCode', 'darkLaptop', 'editor'], gradient: 'from-rose-600 to-orange-700' },
];

export const DOMAIN_BY_ID = Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<
  StudentDomain,
  DomainMeta
>;

type Seed = {
  t: string;
  l: StudentLevel;
  p: PriceTier;
  tech: string[];
  a: string;
  f: [string, string, string];
  hot?: boolean;
  cover?: CoverKey;
  note?: string;
};

const IOT_NOTE = 'Hardware kit is not included in the price — available at extra cost on request.';
const LLM_NOTE = 'Uses a free-tier or local LLM by default; a paid API key can be plugged in.';
const BC_NOTE = 'Runs on a local Ethereum network (Ganache / Hardhat) or a public testnet — no real crypto needed.';
const SEC_NOTE = 'Built for academic, lab and authorised-testing use only.';

const SEEDS: Record<StudentDomain, Seed[]> = {
  'ai-ml': [
    { t: 'Fake News Detection using Machine Learning', l: 'final-year', p: 2, tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Flask'], a: 'Classifies news articles as real or fake using NLP feature extraction and supervised learning, with a web interface to check any headline or article in real time.', f: ['Text cleaning & TF-IDF vectorisation', 'Compares Logistic Regression, Naive Bayes & PassiveAggressive models', 'Flask web app with confidence score'], hot: true },
    { t: 'Credit Card Fraud Detection', l: 'final-year', p: 2, tech: ['Python', 'XGBoost', 'Pandas', 'Streamlit'], a: 'Detects fraudulent card transactions on a highly imbalanced dataset using SMOTE oversampling and gradient boosting, with a dashboard for analysts.', f: ['Handles class imbalance with SMOTE', 'Precision-recall & ROC evaluation', 'Streamlit dashboard for batch predictions'], hot: true },
    { t: 'House Price Prediction', l: 'mini', p: 1, tech: ['Python', 'Scikit-learn', 'Flask'], a: 'Predicts residential property prices from location, size and amenities using regression models and exposes the model through a simple web form.', f: ['EDA with feature correlation plots', 'Linear, Ridge & Random Forest regressors', 'Web form for instant price estimate'] },
    { t: 'Student Performance Prediction', l: 'mini', p: 1, tech: ['Python', 'Random Forest', 'Streamlit'], a: 'Predicts final grades from attendance, study time and past scores so faculty can identify at-risk students early and plan interventions.', f: ['Data preprocessing & encoding', 'Classification of pass / fail / distinction', 'Faculty dashboard with risk flags'] },
    { t: 'Crop Recommendation System', l: 'final-year', p: 2, tech: ['Python', 'Scikit-learn', 'Flask', 'Bootstrap'], a: 'Recommends the most suitable crop for a farm based on soil NPK values, pH, rainfall and temperature to help farmers maximise yield.', f: ['Multi-class classification of 22 crops', 'Fertiliser suggestion module', 'Farmer-friendly multilingual UI'], hot: true },
    { t: 'Heart Disease Prediction', l: 'final-year', p: 2, tech: ['Python', 'Scikit-learn', 'Flask'], a: 'Estimates the risk of heart disease from clinical parameters such as cholesterol, blood pressure and ECG results using ensemble ML models.', f: ['Comparison of 6 ML algorithms', 'Patient input form with risk report', 'Downloadable PDF result'], cover: 'health' },
    { t: 'Movie Recommendation System', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'Cosine Similarity', 'Streamlit'], a: 'Content-based recommender that suggests similar movies using genre, cast and plot keywords, showing posters through a public movie API.', f: ['Content-based filtering with vectorised tags', 'Top-5 similar movie suggestions', 'Poster fetching via API'] },
    { t: 'Customer Churn Prediction', l: 'final-year', p: 2, tech: ['Python', 'LightGBM', 'Streamlit'], a: 'Predicts which telecom customers are likely to leave and explains the key drivers so the business can plan retention offers.', f: ['Feature engineering on usage data', 'LightGBM with hyper-parameter tuning', 'Churn-risk dashboard'] },
    { t: 'Loan Approval Prediction', l: 'mini', p: 1, tech: ['Python', 'Scikit-learn', 'Django'], a: 'Automates loan eligibility screening based on income, credit history and loan amount, with an applicant portal and admin view.', f: ['Missing value handling & encoding', 'Decision Tree vs Random Forest', 'Django applicant portal'] },
    { t: 'Diabetes Prediction with Explainable AI', l: 'final-year', p: 3, tech: ['Python', 'XGBoost', 'SHAP', 'Flask'], a: 'Predicts diabetes risk and explains every prediction with SHAP values so doctors can see which factors drove the result.', f: ['XGBoost classifier with cross-validation', 'SHAP force & summary plots', 'Doctor-friendly report page'], cover: 'health' },
    { t: 'Stock Price Prediction using LSTM', l: 'final-year', p: 3, tech: ['Python', 'TensorFlow', 'LSTM', 'Streamlit'], a: 'Forecasts stock closing prices from historical market data using a stacked LSTM network and visualises predicted vs actual trends.', f: ['Live historical data download', 'Stacked LSTM time-series model', 'Interactive forecast charts'], hot: true, cover: 'dashboard' },
    { t: 'Air Quality Index Prediction', l: 'mini', p: 1, tech: ['Python', 'Scikit-learn', 'Flask'], a: 'Predicts the AQI of a city from pollutant concentrations and weather data, categorising it from Good to Hazardous with health advice.', f: ['Regression on PM2.5, PM10, NO₂, SO₂', 'AQI category & health advisory', 'City-wise trend charts'] },
  ],
  'deep-learning': [
    { t: 'Face Recognition Attendance System', l: 'final-year', p: 3, tech: ['Python', 'OpenCV', 'face_recognition', 'Flask', 'SQLite'], a: 'Marks classroom attendance automatically by recognising student faces from a webcam feed and stores records with date and time.', f: ['Student face enrolment module', 'Real-time recognition from webcam', 'Attendance export to Excel'], hot: true },
    { t: 'Driver Drowsiness Detection', l: 'final-year', p: 3, tech: ['Python', 'OpenCV', 'Dlib', 'CNN'], a: 'Monitors the driver’s eyes and yawning in real time and triggers an alarm when signs of drowsiness are detected, to prevent accidents.', f: ['Eye Aspect Ratio (EAR) tracking', 'Yawn detection with facial landmarks', 'Audio alarm & event log'], hot: true },
    { t: 'Plant Leaf Disease Detection', l: 'final-year', p: 3, tech: ['Python', 'TensorFlow', 'CNN', 'Flask'], a: 'Identifies plant diseases from leaf photos using a CNN trained on the PlantVillage dataset and suggests remedies to farmers.', f: ['Transfer learning with MobileNetV2', '38 disease classes', 'Remedy & pesticide suggestions'] },
    { t: 'Brain Tumor Detection from MRI', l: 'final-year', p: 4, tech: ['Python', 'TensorFlow', 'VGG16', 'Flask'], a: 'Classifies brain MRI scans into tumour types (glioma, meningioma, pituitary, none) using a fine-tuned deep CNN with Grad-CAM heatmaps.', f: ['Image augmentation pipeline', 'Fine-tuned VGG16 classifier', 'Grad-CAM visual explanation'], cover: 'health', hot: true },
    { t: 'Sign Language to Text Recognition', l: 'final-year', p: 3, tech: ['Python', 'MediaPipe', 'TensorFlow', 'OpenCV'], a: 'Translates hand gestures of sign language into text and speech in real time, helping hearing- and speech-impaired users communicate.', f: ['Hand landmark extraction with MediaPipe', 'Gesture classification model', 'Text-to-speech output'] },
    { t: 'Vehicle Number Plate Recognition', l: 'final-year', p: 4, tech: ['Python', 'YOLOv8', 'EasyOCR', 'Flask'], a: 'Detects vehicle number plates in images or video and reads the characters with OCR, logging entries for parking or toll systems.', f: ['YOLOv8 plate detection', 'OCR with text post-processing', 'Entry / exit log with timestamps'] },
    { t: 'Face Mask Detection', l: 'mini', p: 2, tech: ['Python', 'OpenCV', 'MobileNetV2'], a: 'Detects whether people in a live camera feed are wearing face masks and highlights violations with bounding boxes.', f: ['Face detection with OpenCV DNN', 'Mask / no-mask classifier', 'Real-time webcam overlay'] },
    { t: 'Real-time Object Detection with YOLO', l: 'final-year', p: 3, tech: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit'], a: 'Detects and counts 80 everyday object classes in images, videos and webcam streams using a state-of-the-art YOLO model.', f: ['Image, video & webcam input', 'Object counting per class', 'Custom dataset training guide'] },
    { t: 'Handwritten Digit Recognition', l: 'mini', p: 1, tech: ['Python', 'Keras', 'CNN', 'Tkinter'], a: 'Recognises handwritten digits drawn on a canvas using a CNN trained on the MNIST dataset, with over 98% accuracy.', f: ['CNN trained on MNIST', 'Drawing canvas GUI', 'Prediction with confidence'] },
    { t: 'Pneumonia Detection from Chest X-ray', l: 'final-year', p: 4, tech: ['Python', 'PyTorch', 'ResNet', 'Streamlit'], a: 'Screens chest X-ray images for pneumonia using a transfer-learned ResNet model to assist radiologists with faster triage.', f: ['ResNet-50 transfer learning', 'Class-balanced training', 'Upload & diagnose web app'], cover: 'health' },
    { t: 'Emotion Detection from Facial Expressions', l: 'final-year', p: 3, tech: ['Python', 'OpenCV', 'CNN', 'Flask'], a: 'Recognises seven human emotions from facial expressions in real time and can recommend music based on the detected mood.', f: ['FER-2013 trained CNN', 'Live emotion overlay', 'Mood-based music suggestions'] },
    { t: 'Deepfake Image Detection', l: 'final-year', p: 4, tech: ['Python', 'PyTorch', 'EfficientNet'], a: 'Detects manipulated or AI-generated face images using a deep CNN, helping fight misinformation and identity fraud.', f: ['EfficientNet-based classifier', 'Face extraction pre-processing', 'Real vs fake probability report'] },
  ],
  nlp: [
    { t: 'College Enquiry Chatbot', l: 'mini', p: 1, tech: ['Python', 'NLTK', 'Flask', 'JavaScript'], a: 'Answers common student and parent questions about admissions, fees, courses and placements 24×7 through a website chat widget.', f: ['Intent classification with NLTK', 'Editable FAQ knowledge base', 'Embeddable chat widget'], hot: true },
    { t: 'AI Resume Screening & Ranking', l: 'final-year', p: 3, tech: ['Python', 'spaCy', 'Scikit-learn', 'Streamlit'], a: 'Parses resumes, extracts skills and experience, and ranks candidates against a job description to speed up recruitment.', f: ['PDF / DOCX resume parsing', 'Skill extraction with NER', 'JD-to-resume similarity ranking'], hot: true },
    { t: 'Sentiment Analysis of Product Reviews', l: 'mini', p: 1, tech: ['Python', 'NLTK', 'Scikit-learn', 'Flask'], a: 'Classifies customer reviews as positive, negative or neutral and summarises overall product sentiment with charts.', f: ['Text pre-processing pipeline', 'ML sentiment classifier', 'Word clouds & sentiment charts'] },
    { t: 'Text Summarization using Transformers', l: 'final-year', p: 3, tech: ['Python', 'Hugging Face', 'BART', 'Streamlit'], a: 'Generates concise abstractive summaries of long articles, reports and PDFs using a pre-trained transformer model.', f: ['Abstractive summarisation with BART', 'PDF & URL input', 'Adjustable summary length'] },
    { t: 'Spam Email & SMS Classifier', l: 'mini', p: 1, tech: ['Python', 'Naive Bayes', 'Streamlit'], a: 'Filters spam messages from genuine ones using a Naive Bayes classifier trained on labelled email and SMS datasets.', f: ['Bag-of-words & TF-IDF features', '97%+ accuracy Naive Bayes model', 'Instant check web app'] },
    { t: 'PDF Question-Answering Bot (RAG)', l: 'final-year', p: 4, tech: ['Python', 'LangChain', 'FAISS', 'Streamlit'], a: 'Lets users upload PDFs and ask questions in plain English, answering with cited passages using retrieval-augmented generation.', f: ['Document chunking & embeddings', 'FAISS vector search', 'Answers with source citations'], hot: true, note: LLM_NOTE },
    { t: 'Desktop Voice Assistant', l: 'mini', p: 1, tech: ['Python', 'SpeechRecognition', 'pyttsx3'], a: 'A personal voice assistant that opens apps, searches the web, tells the weather and reads news using voice commands.', f: ['Speech-to-text commands', 'Wikipedia, weather & news skills', 'Text-to-speech replies'] },
    { t: 'Hate Speech Detection on Social Media', l: 'final-year', p: 3, tech: ['Python', 'BERT', 'PyTorch', 'Flask'], a: 'Detects hateful and offensive posts using a fine-tuned BERT model, supporting safer online communities.', f: ['Fine-tuned BERT classifier', 'Offensive / hate / neutral labels', 'Moderation dashboard'] },
    { t: 'Language Translator Web App', l: 'mini', p: 2, tech: ['Python', 'MarianMT', 'Flask'], a: 'Translates text between English and Indian languages using open-source neural machine translation models.', f: ['Neural machine translation', 'Multiple language pairs', 'Text-to-speech for output'] },
    { t: 'Healthcare Symptom Checker Chatbot', l: 'final-year', p: 3, tech: ['Python', 'Rasa', 'Flask'], a: 'A conversational bot that asks about symptoms, suggests possible conditions and recommends whether to consult a doctor.', f: ['Rasa NLU & dialogue flows', 'Symptom-to-disease mapping', 'Nearby hospital suggestions'], cover: 'health' },
    { t: 'Social Media Sentiment Dashboard', l: 'final-year', p: 2, tech: ['Python', 'VADER', 'Plotly Dash'], a: 'Analyses public sentiment about a brand or topic from social posts and visualises trends over time on a live dashboard.', f: ['VADER sentiment scoring', 'Keyword & hashtag tracking', 'Interactive trend dashboard'] },
  ],
  'data-science': [
    { t: 'Sales Forecasting Dashboard', l: 'final-year', p: 2, tech: ['Python', 'Prophet', 'Streamlit'], a: 'Forecasts monthly sales for a retail store using time-series models and presents KPIs and forecasts on an interactive dashboard.', f: ['Seasonality & trend decomposition', 'Prophet forecasting', 'KPI dashboard with filters'], hot: true },
    { t: 'COVID-19 Data Analysis & Visualization', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'Plotly'], a: 'Explores global and Indian COVID-19 data to visualise cases, recoveries and vaccination progress with interactive charts and maps.', f: ['Data cleaning & aggregation', 'Choropleth maps', 'State-wise comparison charts'] },
    { t: 'Cricket Match Analytics & Win Predictor', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'], a: 'Analyses historical T20 match data for team and player insights and predicts the win probability during a run chase.', f: ['Team & player performance stats', 'Win probability model', 'Over-by-over visualisation'] },
    { t: 'Customer Segmentation using K-Means', l: 'mini', p: 1, tech: ['Python', 'Scikit-learn', 'Seaborn'], a: 'Groups mall or e-commerce customers by income and spending behaviour so marketing teams can target each segment better.', f: ['Elbow method for optimal clusters', 'K-Means clustering', 'Segment profiling charts'] },
    { t: 'Retail Market Basket Analysis', l: 'mini', p: 1, tech: ['Python', 'Apriori', 'mlxtend', 'Streamlit'], a: 'Finds products frequently bought together using association rule mining to improve store layout and cross-selling.', f: ['Apriori & FP-Growth algorithms', 'Support, confidence & lift metrics', 'Product recommendation rules'] },
    { t: 'HR Employee Attrition Analytics', l: 'final-year', p: 2, tech: ['Python', 'Power BI', 'Scikit-learn'], a: 'Analyses employee data to find attrition drivers and predicts which employees are likely to resign, with an HR dashboard.', f: ['Attrition driver analysis', 'Prediction model', 'Power BI HR dashboard'] },
    { t: 'Power BI Business Sales Dashboard', l: 'mini', p: 1, tech: ['Power BI', 'SQL', 'Excel'], a: 'An interactive business intelligence dashboard showing revenue, profit, region and product performance with drill-downs.', f: ['Data modelling & DAX measures', 'Region & product drill-down', 'Monthly trend analysis'] },
    { t: 'Weather Data Analysis & Forecasting', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'ARIMA'], a: 'Studies historical temperature and rainfall patterns for a city and forecasts upcoming weather trends with ARIMA.', f: ['Historical trend analysis', 'ARIMA time-series forecast', 'Rainfall & temperature charts'] },
    { t: 'Restaurant Ratings Analysis & Prediction', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'Scikit-learn', 'Flask'], a: 'Analyses restaurant data by cuisine, cost and location and predicts the rating a new restaurant is likely to get.', f: ['City & cuisine insights', 'Rating prediction model', 'Interactive filters'] },
    { t: 'Road Accident Analysis & Hotspot Mapping', l: 'final-year', p: 2, tech: ['Python', 'Folium', 'Pandas', 'Scikit-learn'], a: 'Identifies accident-prone locations and contributing factors from road accident data and maps hotspots for authorities.', f: ['Geo-spatial hotspot maps', 'Severity prediction', 'Time & weather factor analysis'] },
  ],
  web: [
    { t: 'Online Examination System', l: 'final-year', p: 2, tech: ['MongoDB', 'Express', 'React', 'Node.js'], a: 'A secure online test platform where admins create exams and students take timed tests with instant results and analytics.', f: ['Admin, faculty & student roles', 'Timed MCQ tests with auto-grading', 'Result analytics & certificates'], hot: true },
    { t: 'Hospital Management System', l: 'final-year', p: 2, tech: ['PHP', 'MySQL', 'Bootstrap'], a: 'Manages patients, doctors, appointments, billing and pharmacy for a hospital through one web application.', f: ['Patient registration & appointments', 'Doctor schedules & prescriptions', 'Billing & reports'], cover: 'health', hot: true },
    { t: 'E-commerce Website with Payment Gateway', l: 'final-year', p: 3, tech: ['React', 'Node.js', 'MongoDB', 'Razorpay (test)'], a: 'A full-featured online store with product catalogue, cart, checkout, online payments in test mode and an admin panel.', f: ['Product catalogue & search', 'Cart, checkout & test payments', 'Admin order management'], hot: true },
    { t: 'College Event Management Portal', l: 'mini', p: 2, tech: ['React', 'Firebase'], a: 'Lets colleges publish events and students register online, with QR-code entry passes and participation certificates.', f: ['Event creation & registration', 'QR-code entry pass', 'Auto-generated certificates'] },
    { t: 'Online Library Management System', l: 'mini', p: 1, tech: ['Python', 'Django', 'MySQL'], a: 'Digitises library operations — book catalogue, issue, return and fine calculation — with student and librarian logins.', f: ['Book catalogue & search', 'Issue / return with due dates', 'Automatic fine calculation'] },
    { t: 'Job Portal with Resume Upload', l: 'final-year', p: 3, tech: ['MongoDB', 'Express', 'React', 'Node.js'], a: 'Connects recruiters and job seekers: post jobs, upload resumes, apply and track application status in one portal.', f: ['Recruiter & candidate dashboards', 'Resume upload & job applications', 'Application status tracking'] },
    { t: 'Real-time Chat Application', l: 'final-year', p: 2, tech: ['React', 'Node.js', 'Socket.IO', 'MongoDB'], a: 'A real-time messaging app with one-to-one and group chats, online status, typing indicators and media sharing.', f: ['Real-time messaging with WebSockets', 'Group chats & online presence', 'Image & file sharing'] },
    { t: 'Blood Bank Management System', l: 'mini', p: 1, tech: ['PHP', 'MySQL', 'Bootstrap'], a: 'Maintains donor records and blood stock, and lets hospitals request blood groups online during emergencies.', f: ['Donor registration & search', 'Blood stock management', 'Hospital request module'], cover: 'health' },
    { t: 'Online Food Ordering System', l: 'final-year', p: 2, tech: ['React', 'Node.js', 'MySQL'], a: 'Customers browse restaurant menus, order food and track delivery status, while restaurants manage orders from a dashboard.', f: ['Menu browsing & cart', 'Order tracking', 'Restaurant admin panel'] },
    { t: 'Hostel Management System', l: 'mini', p: 1, tech: ['Java', 'JSP', 'Servlets', 'MySQL'], a: 'Handles room allocation, fee payments, complaints and visitor logs for college hostels.', f: ['Room allocation', 'Fee & mess bill tracking', 'Complaint management'] },
    { t: 'Learning Management System (LMS)', l: 'final-year', p: 3, tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'], a: 'An online learning platform where instructors publish video courses and quizzes and students track their progress.', f: ['Course & lesson builder', 'Quizzes and progress tracking', 'Completion certificates'] },
    { t: 'Personal Portfolio & Blog CMS', l: 'mini', p: 1, tech: ['Next.js', 'Markdown', 'Tailwind CSS'], a: 'A fast, SEO-friendly personal portfolio with a markdown-powered blog, project gallery and contact form.', f: ['Markdown blog with tags', 'Project gallery', 'SEO & dark mode'] },
    { t: 'Bus Ticket Booking System', l: 'final-year', p: 2, tech: ['Python', 'Django', 'PostgreSQL'], a: 'Users search routes, select seats on a live seat map and book bus tickets, with an operator panel to manage trips.', f: ['Route search & seat selection', 'Booking & e-ticket generation', 'Operator trip management'] },
  ],
  mobile: [
    { t: 'Expense Tracker App', l: 'mini', p: 1, tech: ['Flutter', 'SQLite'], a: 'Tracks daily income and expenses by category with monthly budgets, charts and reminders, all stored offline on the device.', f: ['Category-wise expenses', 'Monthly budget alerts', 'Pie & bar chart reports'] },
    { t: 'Women Safety App with SOS & Live Location', l: 'final-year', p: 3, tech: ['Android', 'Kotlin', 'Firebase', 'Google Maps'], a: 'Sends an SOS alert with live location to trusted contacts by a button press or phone shake, and shows nearby police stations.', f: ['Shake-to-SOS trigger', 'Live location sharing', 'Nearby police & hospitals map'], hot: true },
    { t: 'Smart Attendance App using QR Code', l: 'mini', p: 2, tech: ['Flutter', 'Firebase'], a: 'Faculty display a time-limited QR code and students scan it to mark attendance, preventing proxy attendance.', f: ['Rotating time-bound QR codes', 'Location check', 'Attendance reports'] },
    { t: 'Medicine Reminder App', l: 'mini', p: 1, tech: ['Android', 'Java', 'Room DB'], a: 'Reminds patients to take medicines on time with dosage schedules, refill alerts and a history log for caregivers.', f: ['Dosage schedules & alarms', 'Refill reminders', 'Medication history'], cover: 'health' },
    { t: 'Campus Navigation App', l: 'final-year', p: 2, tech: ['Flutter', 'Google Maps API'], a: 'Helps new students and visitors find departments, labs and facilities on campus with turn-by-turn directions.', f: ['Campus map with points of interest', 'Search & directions', 'Event & notice board'] },
    { t: 'Online Grocery Delivery App', l: 'final-year', p: 3, tech: ['React Native', 'Node.js', 'MongoDB'], a: 'A grocery shopping app with product catalogue, cart, delivery slots and order tracking, plus a store admin panel.', f: ['Catalogue, cart & checkout', 'Delivery slot booking', 'Order tracking & admin panel'] },
    { t: 'Fitness & Diet Tracker', l: 'final-year', p: 2, tech: ['Flutter', 'Firebase'], a: 'Tracks workouts, steps, water intake and calories, and suggests diet plans based on the user’s goals.', f: ['Workout & step tracking', 'Calorie & water logging', 'Goal-based diet plans'] },
    { t: 'Blood Donor Finder App', l: 'mini', p: 2, tech: ['Android', 'Kotlin', 'Firebase'], a: 'Connects patients with nearby blood donors by blood group and location, with instant request notifications.', f: ['Donor registration', 'Location-based donor search', 'Push notification requests'], cover: 'health' },
    { t: 'Notes App with Cloud Sync', l: 'mini', p: 1, tech: ['React Native', 'Firebase'], a: 'A clean notes app with folders, checklists, reminders and real-time cloud sync across devices.', f: ['Rich notes & checklists', 'Cloud sync with login', 'Reminders & search'] },
    { t: 'Plant Disease Detection Mobile App', l: 'final-year', p: 4, tech: ['Flutter', 'TensorFlow Lite'], a: 'Farmers photograph a leaf and the app detects plant disease on-device using a TensorFlow Lite model, even offline.', f: ['On-device TFLite inference', 'Works offline', 'Treatment suggestions'] },
  ],
  iot: [
    { t: 'Smart Home Automation using ESP32', l: 'final-year', p: 3, tech: ['ESP32', 'MQTT', 'Blynk', 'Arduino IDE'], a: 'Controls home lights and appliances from a mobile app and voice assistant, with energy usage monitoring.', f: ['Mobile app & voice control', 'Relay-based appliance switching', 'Usage scheduling'], hot: true, note: IOT_NOTE },
    { t: 'Smart Irrigation System', l: 'final-year', p: 3, tech: ['Arduino', 'NodeMCU', 'Soil Moisture Sensor', 'ThingSpeak'], a: 'Automatically waters crops based on soil moisture and weather, saving water and sending field data to the cloud.', f: ['Soil moisture-based pump control', 'Cloud dashboard', 'Low-water alerts'], hot: true, note: IOT_NOTE },
    { t: 'IoT Health Monitoring System', l: 'final-year', p: 4, tech: ['ESP32', 'MAX30102', 'Firebase', 'Android'], a: 'Monitors a patient’s heart rate, SpO₂ and temperature in real time and alerts doctors when readings are abnormal.', f: ['Heart rate, SpO₂ & temperature', 'Live cloud dashboard', 'Abnormal reading alerts'], cover: 'health', note: IOT_NOTE },
    { t: 'RFID-based Attendance System', l: 'mini', p: 2, tech: ['Arduino', 'RFID RC522', 'MySQL'], a: 'Students tap RFID cards to mark attendance, which is logged with timestamps to a database and web dashboard.', f: ['RFID card scanning', 'Timestamped attendance log', 'Web report dashboard'], note: IOT_NOTE },
    { t: 'Smart Parking System', l: 'final-year', p: 3, tech: ['NodeMCU', 'IR Sensors', 'Firebase', 'Web App'], a: 'Detects free parking slots with sensors and shows real-time availability on a web app so drivers can find spaces faster.', f: ['Slot occupancy sensing', 'Live availability web page', 'Slot booking'], note: IOT_NOTE },
    { t: 'Gas Leakage Detection & Alert', l: 'mini', p: 2, tech: ['Arduino', 'MQ-2 Sensor', 'GSM SIM800L'], a: 'Detects LPG leakage, sounds an alarm, cuts off the regulator and sends an SMS alert to the owner.', f: ['MQ-2 gas sensing', 'Buzzer & exhaust fan control', 'SMS alerts'], note: IOT_NOTE },
    { t: 'IoT Weather Monitoring Station', l: 'mini', p: 2, tech: ['ESP8266', 'DHT11', 'BMP180', 'ThingSpeak'], a: 'Measures temperature, humidity and pressure and publishes the readings to a cloud dashboard accessible from anywhere.', f: ['Multi-sensor readings', 'Cloud graphs', 'Threshold alerts'], note: IOT_NOTE },
    { t: 'Accident Detection & Alert System', l: 'final-year', p: 3, tech: ['Arduino', 'Accelerometer', 'GPS', 'GSM'], a: 'Detects a vehicle crash with an accelerometer and automatically sends the GPS location to emergency contacts.', f: ['Impact detection', 'GPS location capture', 'Automatic SMS to contacts'], note: IOT_NOTE },
    { t: 'Smart Dustbin & Waste Monitoring', l: 'mini', p: 2, tech: ['Arduino', 'Ultrasonic Sensor', 'NodeMCU'], a: 'A touch-free dustbin that opens automatically and reports its fill level so municipal teams can plan collection.', f: ['Automatic lid opening', 'Fill-level monitoring', 'Collection alert dashboard'], note: IOT_NOTE },
    { t: 'Raspberry Pi Smart Surveillance Camera', l: 'final-year', p: 4, tech: ['Raspberry Pi', 'OpenCV', 'Python', 'Telegram Bot'], a: 'Detects motion and unknown faces and instantly sends snapshots to the owner’s phone through a Telegram bot.', f: ['Motion & face detection', 'Instant Telegram alerts', 'Recording to storage'], note: IOT_NOTE },
  ],
  cyber: [
    { t: 'Phishing Website Detection using ML', l: 'final-year', p: 3, tech: ['Python', 'Scikit-learn', 'Flask', 'Chrome Extension'], a: 'Detects phishing URLs from lexical and domain features and warns users through a browser extension before they open them.', f: ['URL feature extraction', 'Random Forest classifier', 'Browser extension warnings'], hot: true },
    { t: 'Network Intrusion Detection System', l: 'final-year', p: 3, tech: ['Python', 'Scikit-learn', 'NSL-KDD'], a: 'Classifies network traffic as normal or attack (DoS, probe, R2L, U2R) using ML models trained on the NSL-KDD dataset.', f: ['Feature selection on traffic data', 'Multi-class attack detection', 'Alert dashboard'], note: SEC_NOTE },
    { t: 'Password Strength Analyzer & Manager', l: 'mini', p: 1, tech: ['Python', 'Tkinter', 'AES'], a: 'Checks password strength, generates strong passwords and stores them encrypted behind a master password.', f: ['Strength scoring & tips', 'Secure password generator', 'AES-encrypted vault'] },
    { t: 'Image Steganography Tool', l: 'mini', p: 1, tech: ['Python', 'OpenCV', 'Tkinter'], a: 'Hides secret text messages inside images using LSB steganography, with optional password-based encryption.', f: ['LSB encoding & decoding', 'Password protection', 'Simple desktop GUI'] },
    { t: 'Secure File Sharing with AES & RSA', l: 'final-year', p: 2, tech: ['Python', 'Flask', 'PyCryptodome'], a: 'Encrypts files with AES and shares keys securely using RSA so only intended recipients can download and decrypt them.', f: ['Hybrid AES + RSA encryption', 'User key management', 'Expiring share links'] },
    { t: 'Malware Detection using Machine Learning', l: 'final-year', p: 3, tech: ['Python', 'Scikit-learn', 'pefile'], a: 'Classifies Windows executables as benign or malicious from PE header features using machine learning.', f: ['PE header feature extraction', 'Ensemble classifier', 'Scan report UI'], note: SEC_NOTE },
    { t: 'Two-Factor Authentication System', l: 'mini', p: 2, tech: ['Node.js', 'Express', 'MongoDB', 'TOTP'], a: 'Adds OTP and authenticator-app based two-factor login to a web application to protect user accounts.', f: ['Email OTP & TOTP (authenticator app)', 'QR-code 2FA setup', 'Backup recovery codes'] },
    { t: 'SQL Injection Detection', l: 'final-year', p: 2, tech: ['Python', 'Scikit-learn', 'Flask'], a: 'Detects SQL injection attempts in user input using pattern rules and an ML classifier before queries reach the database.', f: ['Query pattern analysis', 'ML-based classification', 'Attack logs dashboard'], note: SEC_NOTE },
    { t: 'Graphical Password Authentication', l: 'mini', p: 2, tech: ['Python', 'Django', 'JavaScript'], a: 'Replaces text passwords with image-point selection to resist shoulder-surfing and dictionary attacks.', f: ['Image click-point passwords', 'Shoulder-surfing resistance', 'Account lockout'] },
    { t: 'Port Scanner & Vulnerability Reporter', l: 'mini', p: 1, tech: ['Python', 'Nmap', 'Flask'], a: 'Scans hosts on a lab network for open ports and services and generates a simple vulnerability report.', f: ['Port & service scanning', 'Known-risk hints per service', 'PDF report export'], note: SEC_NOTE },
  ],
  blockchain: [
    { t: 'Blockchain-based E-Voting System', l: 'final-year', p: 4, tech: ['Solidity', 'Ethereum', 'React', 'Web3.js'], a: 'A transparent, tamper-proof voting system where each vote is recorded on the blockchain and results are verifiable by anyone.', f: ['Voter registration & verification', 'One-person-one-vote smart contract', 'Live, verifiable results'], hot: true, note: BC_NOTE },
    { t: 'Land Registry on Blockchain', l: 'final-year', p: 4, tech: ['Solidity', 'Truffle', 'React'], a: 'Records land ownership and transfers on the blockchain to prevent fraud and make property history transparent.', f: ['Property registration', 'Ownership transfer workflow', 'Complete ownership history'], note: BC_NOTE },
    { t: 'Academic Certificate Verification', l: 'final-year', p: 4, tech: ['Solidity', 'IPFS', 'React'], a: 'Universities issue certificates on the blockchain so employers can instantly verify their authenticity with a QR code.', f: ['Certificate issuing portal', 'IPFS document storage', 'QR-based verification'], hot: true, note: BC_NOTE },
    { t: 'Supply Chain Tracking on Blockchain', l: 'final-year', p: 4, tech: ['Solidity', 'Hardhat', 'React'], a: 'Tracks a product from manufacturer to customer on an immutable ledger, improving trust and preventing counterfeits.', f: ['Stage-wise product tracking', 'Role-based participants', 'Customer QR verification'], note: BC_NOTE },
    { t: 'Crowdfunding DApp', l: 'final-year', p: 3, tech: ['Solidity', 'Hardhat', 'Next.js', 'ethers.js'], a: 'A decentralised crowdfunding platform where funds are released only when backers approve campaign milestones.', f: ['Campaign creation', 'Milestone-based fund release', 'Backer voting'], note: BC_NOTE },
    { t: 'NFT Marketplace (Testnet)', l: 'final-year', p: 4, tech: ['Solidity', 'Hardhat', 'IPFS', 'React'], a: 'Mint, list, buy and sell digital collectibles as NFTs on a test network, with metadata stored on IPFS.', f: ['ERC-721 minting', 'Marketplace listing & purchase', 'IPFS metadata'], note: BC_NOTE },
    { t: 'Medical Records on Blockchain', l: 'final-year', p: 4, tech: ['Solidity', 'IPFS', 'React'], a: 'Patients own their medical records on the blockchain and grant or revoke access for doctors and hospitals.', f: ['Encrypted record storage on IPFS', 'Patient-controlled access', 'Access audit trail'], cover: 'health', note: BC_NOTE },
    { t: 'Simple Blockchain in Python', l: 'mini', p: 1, tech: ['Python', 'Flask', 'SHA-256'], a: 'Builds a basic blockchain from scratch with proof-of-work, transactions and a multi-node consensus API to learn the fundamentals.', f: ['Blocks, hashing & proof-of-work', 'Transactions API', 'Multi-node consensus'] },
    { t: 'Decentralized File Storage', l: 'final-year', p: 3, tech: ['IPFS', 'Solidity', 'React'], a: 'Uploads files to IPFS and records ownership and sharing permissions in a smart contract for censorship-resistant storage.', f: ['IPFS upload & retrieval', 'Smart-contract ownership', 'Wallet-based sharing'], note: BC_NOTE },
  ],
  cloud: [
    { t: 'Serverless URL Shortener on AWS', l: 'mini', p: 2, tech: ['AWS Lambda', 'API Gateway', 'DynamoDB'], a: 'A fully serverless URL shortener with custom aliases and click analytics, deployed on the AWS free tier.', f: ['Serverless REST API', 'Custom short aliases', 'Click analytics'] },
    { t: 'CI/CD Pipeline with Jenkins & Docker', l: 'final-year', p: 3, tech: ['Jenkins', 'Docker', 'GitHub', 'AWS EC2'], a: 'Automates build, test and deployment of a web app on every code push using a Jenkins pipeline and Docker containers.', f: ['Pipeline-as-code (Jenkinsfile)', 'Automated tests & Docker build', 'Auto-deploy to cloud server'], hot: true },
    { t: 'Kubernetes Microservices Deployment', l: 'final-year', p: 3, tech: ['Docker', 'Kubernetes', 'Node.js'], a: 'Splits an e-commerce backend into microservices and deploys them on Kubernetes with scaling and service discovery.', f: ['Dockerised microservices', 'K8s deployments & services', 'Horizontal auto-scaling'] },
    { t: 'Cloud File Storage & Sharing', l: 'final-year', p: 3, tech: ['React', 'Node.js', 'AWS S3'], a: 'A cloud drive for uploading, organising and sharing files with secure links, backed by object storage.', f: ['Folder-based file manager', 'Secure share links', 'Storage usage dashboard'] },
    { t: 'Infrastructure as Code with Terraform', l: 'final-year', p: 3, tech: ['Terraform', 'AWS'], a: 'Provisions a complete cloud environment (network, servers, database, load balancer) reproducibly using Terraform.', f: ['VPC, EC2, RDS & ALB modules', 'Remote state management', 'One-command teardown'] },
    { t: 'Monitoring with Prometheus & Grafana', l: 'mini', p: 2, tech: ['Prometheus', 'Grafana', 'Docker'], a: 'Monitors server and application metrics with Prometheus and visualises them on Grafana dashboards with alerting.', f: ['Metrics exporters', 'Grafana dashboards', 'Alert rules'] },
    { t: 'Online Code Editor & Compiler', l: 'final-year', p: 3, tech: ['React', 'Node.js', 'Docker'], a: 'A browser-based code editor that compiles and runs C, C++, Java and Python safely inside isolated containers.', f: ['Multi-language support', 'Sandboxed execution in Docker', 'Save & share snippets'], hot: true },
    { t: 'Online Resume Builder', l: 'mini', p: 1, tech: ['React', 'Firebase Hosting'], a: 'Build a professional resume from templates, preview it live and download as PDF, hosted on the cloud.', f: ['Multiple resume templates', 'Live preview', 'PDF download'] },
  ],
  desktop: [
    { t: 'Student Management System', l: 'mini', p: 1, tech: ['Python', 'Tkinter', 'SQLite'], a: 'A desktop app to add, update, search and delete student records with marks and attendance.', f: ['CRUD on student records', 'Search & filters', 'Export to CSV'], hot: true },
    { t: 'Library Management System', l: 'mini', p: 1, tech: ['Java', 'Swing', 'MySQL'], a: 'A Java desktop application to manage books, members, issues and returns for a college library.', f: ['Book & member management', 'Issue / return tracking', 'Overdue fine calculation'] },
    { t: 'Billing & Inventory Management System', l: 'mini', p: 1, tech: ['Java', 'Swing', 'MySQL'], a: 'A point-of-sale billing system for small shops with stock management, GST invoices and sales reports.', f: ['Product & stock management', 'GST invoice printing', 'Daily sales report'] },
    { t: '2D Arcade Game using Pygame', l: 'mini', p: 1, tech: ['Python', 'Pygame'], a: 'An original 2D arcade game with levels, scoring, sound effects and a high-score table, built with Pygame.', f: ['Game loop & collision detection', 'Levels & scoring', 'High-score persistence'] },
    { t: 'Typing Speed Tester', l: 'mini', p: 1, tech: ['Python', 'Tkinter'], a: 'Measures typing speed and accuracy in words per minute with random passages and progress history.', f: ['WPM & accuracy calculation', 'Random test passages', 'Progress history'] },
    { t: 'Bank Management System', l: 'mini', p: 1, tech: ['C++', 'File Handling'], a: 'Simulates core banking operations — account creation, deposit, withdrawal and balance enquiry — using OOP in C++.', f: ['OOP class design', 'File-based records', 'Transaction history'] },
    { t: 'Hand Gesture Volume Controller', l: 'mini', p: 1, tech: ['Python', 'OpenCV', 'MediaPipe'], a: 'Controls system volume by changing the distance between thumb and index finger in front of a webcam.', f: ['Hand landmark tracking', 'Gesture-to-volume mapping', 'On-screen volume bar'] },
    { t: 'AI Virtual Mouse using Hand Tracking', l: 'mini', p: 2, tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'], a: 'Move the cursor, click and scroll with hand gestures in the air — no physical mouse needed.', f: ['Cursor movement by fingertip', 'Gesture click & scroll', 'Smoothing for stable control'], hot: true },
    { t: 'Smart File Organizer & Duplicate Finder', l: 'mini', p: 1, tech: ['Python', 'Tkinter'], a: 'Automatically sorts files into folders by type and date and finds duplicate files using hashing to free disk space.', f: ['Rule-based auto sorting', 'Hash-based duplicate detection', 'Undo last action'] },
    { t: 'Quiz Application with Leaderboard', l: 'mini', p: 1, tech: ['Java', 'JavaFX', 'MySQL'], a: 'A timed quiz app with multiple categories, instant scoring and a leaderboard for students.', f: ['Category-wise question bank', 'Timer & instant scoring', 'Leaderboard'] },
    { t: 'Payroll Management System', l: 'mini', p: 1, tech: ['Python', 'Tkinter', 'MySQL'], a: 'Calculates employee salaries with allowances, deductions and tax, and generates printable pay slips.', f: ['Employee records', 'Salary & deduction calculation', 'Printable pay slips'] },
  ],
};

/** Additional catalog entries — appended after each domain's core list. */
const MORE_SEEDS: Record<StudentDomain, Seed[]> = {
  'ai-ml': [
    { t: 'Medical Insurance Cost Prediction', l: 'mini', p: 1, tech: ['Python', 'Scikit-learn', 'Streamlit'], a: 'Estimates yearly medical insurance charges from age, BMI, smoking habit and region using regression models.', f: ['EDA on cost drivers', 'Linear & Gradient Boosting regressors', 'Instant premium estimator'], cover: 'health' },
    { t: 'Employee Salary Prediction', l: 'mini', p: 1, tech: ['Python', 'Scikit-learn', 'Flask'], a: 'Predicts the expected salary for a role from experience, skills, education and city to help candidates benchmark offers.', f: ['Feature encoding for skills & city', 'Random Forest regression', 'Salary range output'] },
    { t: 'Parkinson’s Disease Detection from Voice', l: 'final-year', p: 2, tech: ['Python', 'XGBoost', 'Librosa', 'Flask'], a: 'Detects early signs of Parkinson’s disease from voice recordings using acoustic features and gradient boosting.', f: ['Voice feature extraction (jitter, shimmer)', 'XGBoost classifier', 'Upload-a-recording web app'], cover: 'health' },
    { t: 'Flight Fare Prediction', l: 'mini', p: 1, tech: ['Python', 'Random Forest', 'Flask'], a: 'Predicts airline ticket prices from route, airline, stops and booking date so travellers can plan the best time to book.', f: ['Date & duration feature engineering', 'Random Forest with tuning', 'Fare prediction form'] },
    { t: 'Rainfall Prediction for Agriculture', l: 'final-year', p: 2, tech: ['Python', 'Scikit-learn', 'Flask'], a: 'Predicts next-day rainfall from weather parameters to help farmers plan irrigation and harvesting.', f: ['Weather data preprocessing', 'Classification & regression models', 'District-wise forecast view'] },
    { t: 'Product Demand Forecasting', l: 'final-year', p: 2, tech: ['Python', 'XGBoost', 'Streamlit'], a: 'Forecasts product demand per store to reduce stock-outs and over-stocking for retail businesses.', f: ['Lag & seasonality features', 'XGBoost forecasting', 'Store / product dashboard'] },
    { t: 'Smart Traffic Signal using Reinforcement Learning', l: 'final-year', p: 4, tech: ['Python', 'Deep Q-Learning', 'SUMO'], a: 'Trains a reinforcement learning agent to control traffic lights adaptively, reducing waiting time at junctions in simulation.', f: ['SUMO traffic simulation', 'Deep Q-Network agent', 'Fixed vs adaptive comparison'] },
  ],
  'deep-learning': [
    { t: 'Skin Cancer Detection', l: 'final-year', p: 4, tech: ['Python', 'PyTorch', 'EfficientNet', 'Flask'], a: 'Classifies dermoscopic images of skin lesions into benign and malignant types to support early skin cancer screening.', f: ['HAM10000 dataset training', 'EfficientNet transfer learning', 'Lesion upload & report'], cover: 'health' },
    { t: 'Image Caption Generator', l: 'final-year', p: 3, tech: ['Python', 'TensorFlow', 'CNN-LSTM', 'Flask'], a: 'Generates natural-language captions for images by combining a CNN image encoder with an LSTM language model.', f: ['InceptionV3 feature extraction', 'LSTM caption decoder', 'BLEU score evaluation'] },
    { t: 'Crowd Counting & Density Estimation', l: 'final-year', p: 4, tech: ['Python', 'PyTorch', 'CSRNet', 'OpenCV'], a: 'Estimates the number of people in dense crowd images and videos using density-map based deep learning.', f: ['CSRNet density maps', 'Video frame counting', 'Over-crowding alerts'] },
    { t: 'Fire & Smoke Detection from CCTV', l: 'final-year', p: 3, tech: ['Python', 'YOLOv8', 'OpenCV'], a: 'Detects fire and smoke in CCTV footage in real time and raises alerts faster than traditional smoke sensors.', f: ['Custom-trained YOLOv8 model', 'Live CCTV / video input', 'Email & sound alerts'] },
    { t: 'Diabetic Retinopathy Detection', l: 'final-year', p: 4, tech: ['Python', 'TensorFlow', 'ResNet', 'Streamlit'], a: 'Grades the severity of diabetic retinopathy from retinal fundus images to help prevent vision loss.', f: ['Image enhancement pre-processing', 'Five-stage severity grading', 'Doctor report view'], cover: 'health' },
    { t: 'Helmet Detection & Number Plate Capture', l: 'final-year', p: 3, tech: ['Python', 'YOLOv8', 'EasyOCR'], a: 'Detects two-wheeler riders without helmets and captures their number plates for automated traffic enforcement.', f: ['Rider & helmet detection', 'Plate recognition with OCR', 'Violation log with snapshots'] },
    { t: 'Age & Gender Prediction', l: 'mini', p: 2, tech: ['Python', 'OpenCV DNN'], a: 'Predicts the approximate age group and gender of faces in images or webcam video using pre-trained deep networks.', f: ['Face detection', 'Age group & gender models', 'Live webcam overlay'] },
  ],
  nlp: [
    { t: 'AI Interview Question Generator', l: 'final-year', p: 3, tech: ['Python', 'Hugging Face', 'Streamlit'], a: 'Generates role-specific technical and HR interview questions from a job description and evaluates typed answers.', f: ['JD-based question generation', 'Answer scoring with feedback', 'Mock interview mode'], note: LLM_NOTE },
    { t: 'Automatic Answer Sheet Evaluation', l: 'final-year', p: 3, tech: ['Python', 'BERT', 'Flask'], a: 'Scores descriptive student answers by comparing them semantically with a model answer and key points.', f: ['Semantic similarity with BERT', 'Keyword coverage check', 'Faculty review dashboard'] },
    { t: 'Video Transcript Summarizer', l: 'final-year', p: 3, tech: ['Python', 'Whisper', 'Transformers', 'Streamlit'], a: 'Transcribes lecture or meeting videos and produces short summaries and key points for quick revision.', f: ['Speech-to-text transcription', 'Abstractive summarisation', 'Timestamped key points'] },
    { t: 'Speech Emotion Recognition', l: 'final-year', p: 3, tech: ['Python', 'Librosa', 'CNN'], a: 'Recognises emotions such as happy, sad, angry and neutral from speech audio using MFCC features and a CNN.', f: ['MFCC feature extraction', 'CNN emotion classifier', 'Record-and-analyse UI'] },
    { t: 'Plagiarism Checker', l: 'mini', p: 2, tech: ['Python', 'TF-IDF', 'Cosine Similarity', 'Flask'], a: 'Compares documents and highlights similar passages to estimate the percentage of copied content.', f: ['Document upload (PDF / DOCX)', 'Similarity scoring', 'Highlighted matching passages'] },
    { t: 'Multilingual Customer Support Chatbot', l: 'final-year', p: 3, tech: ['Python', 'Rasa', 'Flask', 'Translation API'], a: 'A support chatbot that understands and replies in English, Hindi and Tamil and hands over to a human when needed.', f: ['Multilingual intent detection', 'FAQ & order-status flows', 'Human hand-off'] },
    { t: 'Fake Product Review Detection', l: 'final-year', p: 2, tech: ['Python', 'NLTK', 'Scikit-learn', 'Flask'], a: 'Identifies fake or computer-generated product reviews using linguistic and behavioural features.', f: ['Review text features', 'Reviewer behaviour signals', 'Trust score per product'] },
  ],
  'data-science': [
    { t: 'OTT Content Analysis Dashboard', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'Plotly'], a: 'Analyses a streaming platform’s catalogue by genre, country, rating and release year with interactive charts.', f: ['Catalogue trend analysis', 'Genre & country breakdowns', 'Interactive Plotly dashboard'] },
    { t: 'Stock Portfolio Analyzer', l: 'mini', p: 2, tech: ['Python', 'yfinance', 'Streamlit'], a: 'Tracks a stock portfolio’s returns, risk and diversification and compares it with market indices.', f: ['Live price download', 'Returns, volatility & Sharpe ratio', 'Allocation charts'] },
    { t: 'Student Placement Analytics & Prediction', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'], a: 'Analyses placement records and predicts a student’s placement chances from academics, skills and internships.', f: ['Department-wise placement insights', 'Placement probability model', 'Skill-gap suggestions'] },
    { t: 'Electricity Consumption Forecasting', l: 'final-year', p: 2, tech: ['Python', 'Prophet', 'Plotly'], a: 'Forecasts household or campus electricity usage to plan load and reduce bills.', f: ['Hourly / daily consumption analysis', 'Prophet forecasting', 'Peak-load alerts'] },
    { t: 'Ride-hailing Trip Data Analysis', l: 'mini', p: 1, tech: ['Python', 'Pandas', 'Folium'], a: 'Explores city ride data to find peak hours, popular routes and pickup hotspots on interactive maps.', f: ['Time-based demand analysis', 'Pickup heatmaps', 'Route insights'] },
    { t: 'Hospital Readmission Prediction', l: 'final-year', p: 2, tech: ['Python', 'Scikit-learn', 'Power BI'], a: 'Predicts which discharged patients are likely to be readmitted within 30 days so hospitals can follow up early.', f: ['Clinical data preprocessing', 'Readmission risk model', 'Hospital BI dashboard'], cover: 'health' },
  ],
  web: [
    { t: 'Online Voting System with OTP', l: 'mini', p: 2, tech: ['PHP', 'MySQL', 'Bootstrap'], a: 'A college election portal where verified students vote once using OTP login and results are published instantly.', f: ['OTP-based voter login', 'Candidate & election management', 'Live result charts'] },
    { t: 'Alumni Management Portal', l: 'final-year', p: 2, tech: ['MongoDB', 'Express', 'React', 'Node.js'], a: 'Connects a college with its alumni for networking, job referrals, events and mentorship.', f: ['Alumni directory & profiles', 'Job referral board', 'Events & mentorship requests'] },
    { t: 'Real Estate Property Listing Portal', l: 'final-year', p: 3, tech: ['Next.js', 'MongoDB', 'Google Maps API'], a: 'Owners and agents list properties with photos and location; buyers search, filter and contact them.', f: ['Property listing with photos', 'Map-based search & filters', 'Enquiry & wishlist'] },
    { t: 'Doctor Appointment Booking System', l: 'final-year', p: 2, tech: ['MongoDB', 'Express', 'React', 'Node.js'], a: 'Patients find doctors by speciality, book available slots and get reminders; doctors manage their schedule.', f: ['Doctor search by speciality', 'Slot booking & reminders', 'Doctor & admin dashboards'], cover: 'health' },
    { t: 'Online Complaint & Grievance Portal', l: 'mini', p: 1, tech: ['Python', 'Django', 'MySQL'], a: 'Students or citizens raise complaints, track their status and receive resolutions from the right department.', f: ['Complaint registration', 'Department routing & status', 'Resolution feedback'] },
    { t: 'Car Rental Management System', l: 'mini', p: 2, tech: ['PHP', 'Laravel', 'MySQL'], a: 'Customers browse available cars, book for dates and pay, while admins manage fleet and bookings.', f: ['Car catalogue & availability', 'Date-based booking', 'Fleet & booking admin'] },
    { t: 'Freelance Marketplace', l: 'final-year', p: 3, tech: ['MongoDB', 'Express', 'React', 'Node.js'], a: 'Clients post projects, freelancers bid, and work is delivered through milestones with in-app chat.', f: ['Project posting & bidding', 'Milestones & reviews', 'In-app messaging'] },
    { t: 'Video Conferencing Web App', l: 'final-year', p: 3, tech: ['React', 'WebRTC', 'Socket.IO', 'Node.js'], a: 'A browser-based video meeting app with rooms, screen sharing and chat built on WebRTC.', f: ['Peer-to-peer video & audio', 'Screen sharing', 'Meeting chat & room links'] },
  ],
  mobile: [
    { t: 'College ERP Mobile App', l: 'final-year', p: 3, tech: ['Flutter', 'Firebase'], a: 'One app for students to see attendance, timetable, marks, fee status and notices from the college.', f: ['Attendance & marks view', 'Timetable & notices', 'Fee status & reminders'] },
    { t: 'College Bus Tracking App', l: 'final-year', p: 3, tech: ['Flutter', 'Google Maps API', 'Firebase'], a: 'Shows the live location and ETA of college buses so students know exactly when to reach the stop.', f: ['Driver app with live GPS', 'Student live map & ETA', 'Arrival notifications'] },
    { t: 'Campus Lost & Found App', l: 'mini', p: 1, tech: ['Android', 'Kotlin', 'Firebase'], a: 'Students post lost or found items with photos and location and get matched with the owner quickly.', f: ['Post lost / found items', 'Category & location search', 'In-app chat'] },
    { t: 'Pet Adoption App', l: 'mini', p: 2, tech: ['Flutter', 'Firebase'], a: 'Connects shelters with adopters through pet profiles, adoption requests and care tips.', f: ['Pet profiles with photos', 'Adoption requests', 'Shelter dashboard'] },
    { t: 'Flashcard Language Learning App', l: 'mini', p: 1, tech: ['React Native', 'SQLite'], a: 'An offline flashcard app with spaced repetition to learn new words and phrases every day.', f: ['Spaced repetition engine', 'Custom decks', 'Daily streaks & progress'] },
    { t: 'Mood Tracker & Mental Wellness Journal', l: 'final-year', p: 2, tech: ['Flutter', 'Firebase', 'Sentiment Analysis'], a: 'Users log moods and journal entries; the app analyses sentiment trends and suggests wellness activities.', f: ['Daily mood & journal logging', 'Sentiment trend charts', 'Wellness suggestions'], cover: 'health' },
  ],
  iot: [
    { t: 'Smart Energy Meter with Billing', l: 'final-year', p: 3, tech: ['ESP32', 'PZEM-004T', 'Blynk'], a: 'Measures household power consumption in real time, calculates the bill and alerts on unusual usage.', f: ['Voltage, current & power monitoring', 'Automatic bill calculation', 'High-usage alerts'], note: IOT_NOTE },
    { t: 'Automatic Street Light Control', l: 'mini', p: 2, tech: ['Arduino', 'LDR', 'IR Sensors'], a: 'Street lights switch on at dusk and brighten only when vehicles or people pass, saving energy.', f: ['Light-dependent switching', 'Motion-based brightness', 'Energy saving report'], note: IOT_NOTE },
    { t: 'Smart Water Tank Level Monitor', l: 'mini', p: 2, tech: ['NodeMCU', 'Ultrasonic Sensor', 'Blynk'], a: 'Shows the water level on a phone and switches the motor on and off automatically to prevent overflow.', f: ['Live tank level on mobile', 'Automatic motor control', 'Low / overflow alerts'], note: IOT_NOTE },
    { t: 'Fingerprint Door Lock & Attendance', l: 'mini', p: 2, tech: ['Arduino', 'R307 Fingerprint Sensor', 'Solenoid Lock'], a: 'Unlocks doors only for enrolled fingerprints and records entry times as attendance.', f: ['Fingerprint enrolment', 'Secure door unlocking', 'Entry log'], note: IOT_NOTE },
    { t: 'Vehicle Tracking with GPS & GSM', l: 'final-year', p: 3, tech: ['Arduino', 'NEO-6M GPS', 'SIM800L', 'Web Map'], a: 'Tracks a vehicle’s live location on a map and sends its location by SMS on request.', f: ['Live GPS tracking', 'SMS location on request', 'Route history map'], note: IOT_NOTE },
    { t: 'Smart Agriculture with Crop Health Monitoring', l: 'final-year', p: 4, tech: ['ESP32', 'Soil & DHT Sensors', 'Python ML', 'Firebase'], a: 'Combines field sensors with ML to monitor crop conditions and recommend irrigation and fertiliser actions.', f: ['Multi-sensor field monitoring', 'ML-based recommendations', 'Farmer mobile dashboard'], note: IOT_NOTE },
    { t: 'Forest Fire Detection & Alert', l: 'mini', p: 2, tech: ['NodeMCU', 'Flame & Smoke Sensors', 'ThingSpeak'], a: 'Detects early signs of fire using flame, smoke and temperature sensors and sends instant alerts.', f: ['Flame, smoke & heat sensing', 'Cloud alerts', 'Sensor node map'], note: IOT_NOTE },
  ],
  cyber: [
    { t: 'Honeypot for Attack Monitoring', l: 'final-year', p: 3, tech: ['Python', 'Cowrie', 'ELK Stack'], a: 'Deploys a decoy SSH server that records attacker behaviour and visualises attack sources and commands.', f: ['SSH honeypot setup', 'Attack log collection', 'Kibana attack dashboard'], note: SEC_NOTE },
    { t: 'End-to-End Encrypted Chat App', l: 'final-year', p: 3, tech: ['React', 'Node.js', 'Web Crypto API'], a: 'A chat app where messages are encrypted on the sender’s device and can only be read by the recipient.', f: ['Public-key key exchange', 'Client-side encryption', 'Encrypted message storage'] },
    { t: 'Ransomware Detection using Behaviour Analysis', l: 'final-year', p: 4, tech: ['Python', 'Scikit-learn', 'watchdog'], a: 'Detects ransomware-like behaviour such as rapid file encryption and renaming, and stops the process early.', f: ['File activity monitoring', 'Behaviour-based ML detection', 'Automatic process blocking'], note: SEC_NOTE },
    { t: 'File Integrity Monitoring System', l: 'mini', p: 2, tech: ['Python', 'SHA-256', 'watchdog'], a: 'Monitors important files and folders and alerts when any file is changed, added or deleted.', f: ['Baseline hashing', 'Real-time change detection', 'Email alerts & reports'] },
    { t: 'Digital Forensics Toolkit', l: 'final-year', p: 3, tech: ['Python', 'ExifTool', 'Pandas'], a: 'Extracts image metadata, browser history and system logs and builds a timeline for forensic investigation.', f: ['Metadata extraction', 'Log & history parsing', 'Investigation timeline report'], note: SEC_NOTE },
    { t: 'DDoS Attack Detection using ML', l: 'final-year', p: 3, tech: ['Python', 'Scikit-learn', 'CICIDS2017'], a: 'Detects distributed denial-of-service traffic patterns using machine learning on network flow data.', f: ['Flow feature extraction', 'Attack vs normal classification', 'Live detection dashboard'], note: SEC_NOTE },
  ],
  blockchain: [
    { t: 'Decentralized Identity Management', l: 'final-year', p: 4, tech: ['Solidity', 'Hardhat', 'React', 'IPFS'], a: 'Users own a self-sovereign digital identity and share verified credentials without a central authority.', f: ['DID creation', 'Verifiable credentials', 'Selective disclosure'], note: BC_NOTE },
    { t: 'Charity Donation Transparency Platform', l: 'final-year', p: 3, tech: ['Solidity', 'Hardhat', 'React'], a: 'Tracks every donation from donor to beneficiary on the blockchain so NGOs can prove how funds were used.', f: ['Donation tracking', 'Fund utilisation proof', 'Public audit page'], note: BC_NOTE },
    { t: 'Peer-to-Peer Energy Trading', l: 'final-year', p: 4, tech: ['Solidity', 'Hardhat', 'Next.js'], a: 'Households with solar panels sell surplus energy directly to neighbours through smart contracts.', f: ['Energy token & marketplace', 'Automatic settlement', 'Trading history'], note: BC_NOTE },
    { t: 'Smart Contract Rental Agreement', l: 'final-year', p: 3, tech: ['Solidity', 'ethers.js', 'React'], a: 'Creates rental agreements as smart contracts with automatic deposit handling and monthly rent payments.', f: ['Agreement creation & signing', 'Escrowed security deposit', 'Rent payment tracking'], note: BC_NOTE },
    { t: 'Agricultural Produce Traceability', l: 'final-year', p: 3, tech: ['Solidity', 'IPFS', 'React'], a: 'Records each stage of farm produce from farmer to retailer so consumers can scan and verify its origin.', f: ['Farm-to-shelf tracking', 'Quality certificates on IPFS', 'Consumer QR scan'], note: BC_NOTE },
  ],
  cloud: [
    { t: 'Auto-scaling Web App on AWS', l: 'final-year', p: 3, tech: ['AWS EC2', 'Load Balancer', 'Auto Scaling', 'RDS'], a: 'Deploys a web application that automatically adds or removes servers based on traffic, with a managed database.', f: ['Load-balanced deployment', 'Auto-scaling policies', 'Load testing report'] },
    { t: 'Serverless Image Resizer', l: 'mini', p: 2, tech: ['AWS Lambda', 'S3', 'Python'], a: 'Automatically creates thumbnails and optimised versions whenever an image is uploaded to cloud storage.', f: ['S3 upload trigger', 'Multiple size outputs', 'Cost-efficient serverless design'] },
    { t: 'Centralized Log Monitoring with ELK', l: 'final-year', p: 3, tech: ['Elasticsearch', 'Logstash', 'Kibana', 'Docker'], a: 'Collects logs from multiple servers into one place, with search, dashboards and error alerts.', f: ['Log shipping & parsing', 'Kibana dashboards', 'Error-rate alerts'] },
    { t: 'GitOps Deployment with Argo CD', l: 'final-year', p: 4, tech: ['Kubernetes', 'Argo CD', 'Helm', 'GitHub'], a: 'Deploys applications to Kubernetes automatically from Git, with rollbacks and environment promotion.', f: ['Helm charts', 'Git-driven sync', 'One-click rollback'] },
    { t: 'Cloud Cost Monitoring Dashboard', l: 'final-year', p: 3, tech: ['Python', 'AWS Cost Explorer API', 'Grafana'], a: 'Tracks daily cloud spend per service and alerts when the budget is about to be exceeded.', f: ['Daily cost collection', 'Service-wise breakdown', 'Budget alerts'] },
    { t: 'Static Website CI/CD with GitHub Actions', l: 'mini', p: 1, tech: ['GitHub Actions', 'AWS S3', 'CloudFront'], a: 'Builds and deploys a website automatically to the cloud on every push, with a CDN for fast loading.', f: ['Automated build pipeline', 'S3 + CDN hosting', 'Cache invalidation'] },
  ],
  desktop: [
    { t: 'Text Editor with Syntax Highlighting', l: 'mini', p: 1, tech: ['Python', 'Tkinter'], a: 'A lightweight code and text editor with tabs, syntax highlighting, find & replace and dark mode.', f: ['Multi-tab editing', 'Syntax highlighting', 'Find & replace'] },
    { t: 'Chess Game with AI Opponent', l: 'mini', p: 2, tech: ['Python', 'Pygame', 'Minimax'], a: 'A playable chess game with full rules and a computer opponent using minimax with alpha-beta pruning.', f: ['Complete chess rules', 'Minimax AI with difficulty levels', 'Move history'] },
    { t: 'Sudoku Solver & Generator', l: 'mini', p: 1, tech: ['Python', 'Tkinter', 'Backtracking'], a: 'Generates Sudoku puzzles of different difficulty and solves any puzzle step by step using backtracking.', f: ['Puzzle generator', 'Step-by-step solver', 'Hints & validation'] },
    { t: 'Pathfinding Algorithm Visualizer', l: 'mini', p: 1, tech: ['Python', 'Pygame'], a: 'Visualises how A*, Dijkstra, BFS and DFS find the shortest path on a grid with walls you draw.', f: ['Four search algorithms', 'Draw walls & weights', 'Speed control'] },
    { t: 'Hotel Management System', l: 'mini', p: 1, tech: ['Java', 'Swing', 'MySQL'], a: 'Manages room bookings, check-in and check-out, customer records and billing for a hotel.', f: ['Room booking & status', 'Check-in / check-out', 'Invoice generation'] },
    { t: 'Image Editor with Filters', l: 'mini', p: 1, tech: ['Python', 'OpenCV', 'Tkinter'], a: 'A desktop photo editor with crop, rotate, brightness, blur, sketch and cartoon filters.', f: ['Basic edits (crop, rotate, resize)', 'Artistic filters', 'Before / after preview'] },
    { t: 'Desktop Screen Recorder', l: 'mini', p: 1, tech: ['Python', 'OpenCV', 'PyAutoGUI'], a: 'Records the screen to a video file with optional webcam overlay and hotkeys to start and stop.', f: ['Full-screen & region capture', 'Webcam overlay', 'Hotkey controls'] },
  ],
};

const ALL_SEEDS = Object.fromEntries(
  DOMAINS.map((d) => [d.id, [...SEEDS[d.id], ...MORE_SEEDS[d.id]]])
) as Record<StudentDomain, Seed[]>;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Rotate covers popular-first so featured cards next to each other differ. */
const coverOrder = (seeds: Seed[]) => {
  const order = new Map<Seed, number>();
  [...seeds.filter((s) => s.hot && !s.cover), ...seeds.filter((s) => !s.hot && !s.cover)].forEach(
    (seed, i) => order.set(seed, i)
  );
  return order;
};

export const STUDENT_PROJECTS: StudentProject[] = DOMAINS.flatMap((domain) => {
  const order = coverOrder(ALL_SEEDS[domain.id]);
  return ALL_SEEDS[domain.id].map((seed, index) => ({
    id: slugify(seed.t),
    code: `${domain.prefix}-${String(index + 1).padStart(3, '0')}`,
    title: seed.t,
    domain: domain.id,
    level: seed.l,
    tier: seed.p,
    price: PRICE_TIERS[seed.p].price,
    tech: seed.tech,
    abstract: seed.a,
    features: seed.f,
    popular: Boolean(seed.hot),
    cover: seed.cover ?? domain.covers[(order.get(seed) ?? index) % domain.covers.length],
    note: seed.note,
  }));
});

export const DOMAIN_COUNTS = STUDENT_PROJECTS.reduce(
  (acc, p) => {
    acc[p.domain] = (acc[p.domain] ?? 0) + 1;
    return acc;
  },
  {} as Record<StudentDomain, number>
);

/** Rounded for headlines, e.g. 116 → "110+" */
export const STUDENT_PROJECT_COUNT_LABEL = `${Math.floor(STUDENT_PROJECTS.length / 10) * 10}+`;

export const FEATURED_STUDENT_PROJECTS = STUDENT_PROJECTS.filter((p) => p.popular);

export const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

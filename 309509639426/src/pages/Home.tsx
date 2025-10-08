import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 床垫产品数据
const mattressData = {
  name: "Super11 Premium Mattress",
  title: "Super11 优质记忆棉床垫",
  description: "Super11床垫采用高级记忆棉材质，结合人体工学设计，为您提供无与伦比的睡眠体验。独特的透气层设计确保整夜凉爽，缓解压力点，让您醒来时感觉精力充沛。",
  features: [
    { 
      icon: "fa-bed", 
      title: "人体工学设计", 
      description: "完美贴合身体曲线，提供最佳支撑" 
    },
    { 
      icon: "fa-temperature-low", 
      title: "透气材质", 
      description: "特殊透气层设计，保持整夜凉爽舒适" 
    },
    { 
      icon: "fa-shield-alt", 
      title: "耐用结构", 
      description: "高品质材料确保长期使用不变形" 
    },
    { 
      icon: "fa-heart", 
      title: "健康睡眠", 
      description: "缓解压力点，减少翻身次数，提高睡眠质量" 
    }
  ],
  shopeeLink: "https://shopee.ph/super11_mattress?categoryId=100636&entryPoint=ShopByPDP&itemId=21293494506"
};

// 床垫图片URL - 使用指定API生成
const mattressImages = [
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=super11%20mattress%20in%20modern%20bedroom%20setting%20high%20quality%20photography&sign=4962d9c659883eaecc444d47019d9d31",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=super11%20mattress%20close%20up%20showing%20comfort%20and%20quality%20material&sign=ffd91ddd567d8262e95bee7ee4f2e405",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=super11%20mattress%20with%20person%20sleeping%20comfortably%20in%20bedroom&sign=8b1876f9f366b34ba2888122f50cf31a"
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件，用于导航栏样式变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 图片轮播功能
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % mattressImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      {/* 导航栏 */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-400">
            <i className="fa-solid fa-bed mr-2"></i>Super11
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">特点</a></li>
              <li><a href="#specs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">规格</a></li>
              <li><a href="#buy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">立即购买</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        {/* 英雄区域 */}
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-900 dark:text-blue-300">
                体验{ mattressData.title }<br />带来的完美睡眠
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                { mattressData.description }
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={mattressData.shopeeLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                >
                  <i className="fa-shopping-cart mr-2"></i>立即购买
                </a>
                <a 
                  href="#features"
                  className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-400 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                >
                  <i className="fa-info-circle mr-2"></i>了解更多
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {mattressImages.map((img, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Super11 mattress ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {/* 图片指示器 */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {mattressImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  ></button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 特点区域 */}
        <section id="features" className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900 dark:text-blue-300">为什么选择 Super11 床垫</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                精心设计的每一个细节，只为给您带来最舒适的睡眠体验
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mattressData.features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-5 text-blue-700 dark:text-blue-400 text-2xl">
                    <i className={`fa-solid ${feature.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-300">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 产品规格区域 */}
        <section id="specs" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900 dark:text-blue-300">产品规格</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Super11床垫采用高品质材料，精心打造，为您提供持久舒适的睡眠体验
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                      <i className="fa-solid fa-check text-blue-700 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-blue-900 dark:text-blue-300">高级记忆棉材质</h3>
                      <p className="text-gray-600 dark:text-gray-300">5层优质记忆棉，根据体温和压力自动调节，提供个性化支撑</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                      <i className="fa-solid fa-check text-blue-700 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-blue-900 dark:text-blue-300">透气设计</h3>
                      <p className="text-gray-600 dark:text-gray-300">特殊透气孔结构，促进空气流通，保持整夜凉爽</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                      <i className="fa-solid fa-check text-blue-700 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-blue-900 dark:text-blue-300">防螨抗菌处理</h3>
                      <p className="text-gray-600 dark:text-gray-300">专业抗菌处理，防止尘螨滋生，适合敏感人群</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                      <i className="fa-solid fa-check text-blue-700 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-blue-900 dark:text-blue-300">多种尺寸可选</h3>
                      <p className="text-gray-600 dark:text-gray-300">单人、双人、加大双人等多种尺寸，满足不同需求</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                      <i className="fa-solid fa-check text-blue-700 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-blue-900 dark:text-blue-300">10年质量保证</h3>
                      <p className="text-gray-600 dark:text-gray-300">我们对产品质量充满信心，提供长达10年的质保服务</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                <img 
                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Super11%20mattress%20sectional%20view%20showing%20layers%20and%20construction%20details&sign=5b41db1448c033b0180c212cfcfeaeed" 
                  alt="Super11 mattress construction"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">精心设计的多层结构</h3>
                    <p className="text-white/90">每一层都经过科学设计，提供最佳支撑和舒适度</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 购买区域 */}
        <section id="buy" className="py-16 md:py-24 bg-blue-700 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">准备好改善您的睡眠了吗？</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              立即购买Super11床垫，享受优质睡眠体验。点击下方链接，前往Shopee店铺了解更多详情和优惠。
            </p>
            <a 
              href={mattressData.shopeeLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center mx-auto"
            >
              <i className="fa-shopping-bag mr-2 text-xl"></i>
              在Shopee购买Super11床垫
            </a>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
                <div className="opacity-80">满意客户</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
                <div className="opacity-80">平均评分</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">10年</div>
                <div className="opacity-80">质量保证</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-bed mr-2 text-blue-400"></i>Super11
              </h3>
              <p className="text-gray-400 mb-4">
                致力于为您提供最舒适的睡眠体验，让每一个夜晚都充满活力。
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">关于我们</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">产品特点</a></li>
                <li><a href="#specs" className="text-gray-400 hover:text-white transition-colors">产品规格</a></li>
                <li><a href="#buy" className="text-gray-400 hover:text-white transition-colors">购买方式</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">常见问题</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fa-solid fa-envelope mt-1 mr-2 text-blue-400"></i>
                  <span className="text-gray-400">support@super11mattress.com</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-phone mt-1 mr-2 text-blue-400"></i>
                  <span className="text-gray-400">+63 912 345 6789</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-map-marker-alt mt-1 mr-2 text-blue-400"></i>
                  <span className="text-gray-400">马尼拉大都会，菲律宾</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Super11 Mattress. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
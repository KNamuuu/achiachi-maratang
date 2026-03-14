import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, TrendingUp, Users, Shield } from 'lucide-react';
import { partnershipSchema } from '../lib/partnershipSchema';
import type { PartnershipFormData } from '../lib/partnershipSchema';
import { supabase } from '../lib/supabaseClient';
import Toast from '../components/ui/Toast';

const benefits = [
  { icon: TrendingUp, title: '높은 수익률', desc: '평균 마진율 65% 이상의 검증된 수익 구조' },
  { icon: Users, title: '본사 지원', desc: '오픈 전 교육부터 운영 컨설팅까지 풀 서포트' },
  { icon: Shield, title: '브랜드 파워', desc: '검증된 브랜드 인지도로 안정적인 고객 확보' },
];

const regionOptions = ['서울', '경기', '인천', '부산', '대구', '대전', '광주', '기타'];
const budgetOptions = ['5천만원 미만', '5천만원 ~ 1억', '1억 ~ 2억', '2억 이상'];
const experienceOptions = ['없음', '1년 미만', '1~3년', '3년 이상'];

export default function Partnership() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({ message: '', type: 'success', visible: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
  });

  const onSubmit = async (data: PartnershipFormData) => {
    try {
      const { error } = await supabase.from('partnerships').insert([data]);
      if (error) throw error;
      setToast({ message: '문의가 성공적으로 접수되었습니다!', type: 'success', visible: true });
      reset();
    } catch {
      setToast({ message: '문의 접수에 실패했습니다. 다시 시도해주세요.', type: 'error', visible: true });
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white';
  const errorClass = 'font-body text-xs text-red-500 mt-1';

  return (
    <div className="min-h-screen bg-secondary pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-7xl text-dark tracking-wider">
            PARTNERSHIP
          </h1>
          <p className="font-body text-dark/60 mt-3">
            아치아치 마라탕과 함께 성공 파트너가 되세요
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <benefit.icon size={40} className="mx-auto text-primary mb-4" />
              <h3 className="font-body font-bold text-lg text-dark">{benefit.title}</h3>
              <p className="font-body text-dark/60 text-sm mt-2">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-sm"
        >
          <h2 className="font-heading text-3xl text-dark text-center mb-8">
            가맹 문의
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-bold text-dark block mb-1">이름 *</label>
                <input {...register('name')} className={inputClass} placeholder="홍길동" />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label className="font-body text-sm font-bold text-dark block mb-1">연락처 *</label>
                <input {...register('phone')} className={inputClass} placeholder="010-1234-5678" />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-bold text-dark block mb-1">이메일 *</label>
              <input {...register('email')} type="email" className={inputClass} placeholder="example@email.com" />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="font-body text-sm font-bold text-dark block mb-1">희망 지역 *</label>
                <select {...register('region')} className={inputClass}>
                  <option value="">선택</option>
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.region && <p className={errorClass}>{errors.region.message}</p>}
              </div>
              <div>
                <label className="font-body text-sm font-bold text-dark block mb-1">투자 예산 *</label>
                <select {...register('budget')} className={inputClass}>
                  <option value="">선택</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
              </div>
              <div>
                <label className="font-body text-sm font-bold text-dark block mb-1">외식업 경험 *</label>
                <select {...register('experience')} className={inputClass}>
                  <option value="">선택</option>
                  {experienceOptions.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
                {errors.experience && <p className={errorClass}>{errors.experience.message}</p>}
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-bold text-dark block mb-1">문의 내용</label>
              <textarea
                {...register('message')}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="궁금한 점이 있으시면 자유롭게 작성해주세요."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-body font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                '제출 중...'
              ) : (
                <>
                  <Send size={18} />
                  문의 접수하기
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-green-600 font-body text-sm">
            <CheckCircle size={16} />
            접수 후 1~2 영업일 내 담당자가 연락드립니다.
          </div>
        </motion.div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}

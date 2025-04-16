
import React, { useState } from "react";
import { 
  CreditCard, 
  Check, 
  Users, 
  CalendarDays, 
  Globe, 
  ExternalLink, 
  AlertTriangle, 
  Cpu, 
  Power, 
  Shield, 
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface SubscriptionSettingsProps {
  onChange: () => void;
}

// Novas interfaces para o sistema de assinatura
interface UserTier {
  id: string;
  name: string;
  userCount: number;
  priceMultiplier: number;
  description: string;
}

interface SubscriptionDuration {
  id: string;
  name: string;
  months: number;
  discount: number;
  label: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  icon: React.ElementType;
  enabled: boolean;
}

// Formulário de configuração de assinatura
interface SubscriptionForm {
  userTier: string;
  duration: string;
  addOns: string[];
}

const SubscriptionSettings: React.FC<SubscriptionSettingsProps> = ({ onChange }) => {
  // Dados para as opções de assinatura
  const userTiers: UserTier[] = [
    {
      id: "player",
      name: "Player",
      userCount: 1,
      priceMultiplier: 1,
      description: "Ideal para jogadores individuais"
    },
    {
      id: "coop",
      name: "Co-op",
      userCount: 2,
      priceMultiplier: 1.8,
      description: "Perfeito para você e um amigo"
    },
    {
      id: "alliance",
      name: "Alliance",
      userCount: 5,
      priceMultiplier: 4,
      description: "Para times e grupos de jogadores"
    }
  ];

  const durations: SubscriptionDuration[] = [
    {
      id: "monthly",
      name: "Mensal",
      months: 1,
      discount: 0,
      label: "Cobrança mensal"
    },
    {
      id: "quarterly",
      name: "Trimestral",
      months: 3,
      discount: 0.17,
      label: "17% de desconto"
    },
    {
      id: "yearly",
      name: "Anual",
      months: 12,
      discount: 0.37,
      label: "37% de desconto"
    }
  ];

  const addOns: AddOn[] = [
    {
      id: "advanced_optimizer",
      name: "Advanced Optimizer",
      description: "Algoritmos avançados de otimização para máximo desempenho",
      monthlyPrice: 2.99,
      icon: Cpu,
      enabled: false
    },
    {
      id: "power_manager",
      name: "Power Manager",
      description: "Controle avançado de energia e temperatura",
      monthlyPrice: 1.99,
      icon: Power,
      enabled: false
    },
    {
      id: "vpn_integration",
      name: "VPN Integration",
      description: "Proteção e roteamento avançado para conexões seguras",
      monthlyPrice: 3.99,
      icon: Shield,
      enabled: false
    }
  ];

  // Estado para o plano atual do usuário (simulado)
  const [currentPlan, setCurrentPlan] = useState({
    userTier: "player",
    duration: "monthly",
    addOns: ["vpn_integration"],
    active: true,
    nextBilling: new Date(2025, 4, 25)
  });

  // Configuração do formulário
  const form = useForm<SubscriptionForm>({
    defaultValues: {
      userTier: "player",
      duration: "monthly",
      addOns: []
    }
  });

  const [selectedUserTier, setSelectedUserTier] = useState("player");
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Simulação de preços regionais (na prática viria de uma API)
  const basePrice = 9.99; // Preço base mensal para Player
  
  // Cálculo do preço baseado nas seleções
  const calculatePrice = (tierId: string, durationId: string, addOnIds: string[]) => {
    const tier = userTiers.find(t => t.id === tierId);
    const duration = durations.find(d => d.id === durationId);
    
    if (!tier || !duration) return 0;
    
    // Preço base multiplicado pelo tipo de usuário
    let price = basePrice * tier.priceMultiplier;
    
    // Aplicar desconto por duração
    price = price * (1 - duration.discount);
    
    return price;
  };
  
  const calculateTotalPrice = (tierId: string, durationId: string, addOnIds: string[]) => {
    let basePrice = calculatePrice(tierId, durationId, addOnIds);
    const duration = durations.find(d => d.id === durationId);
    
    // Adicionar preço dos add-ons
    const addOnsCost = addOnIds.reduce((total, id) => {
      const addOn = addOns.find(a => a.id === id);
      if (!addOn) return total;
      return total + (addOn.monthlyPrice * (duration?.months || 1));
    }, 0);
    
    return (basePrice * (duration?.months || 1)) + addOnsCost;
  };
  
  const formatPrice = (price: number, durationId: string) => {
    const duration = durations.find(d => d.id === durationId);
    if (durationId === "monthly") {
      return `$${price.toFixed(2)}/mês`;
    } else {
      return `$${price.toFixed(2)} a cada ${duration?.months} meses`;
    }
  };
  
  const handleSubscriptionChange = (tier: string, duration: string) => {
    setSelectedUserTier(tier);
    setSelectedDuration(duration);
    onChange();
  };
  
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addOnId)) {
        return prev.filter(id => id !== addOnId);
      } else {
        return [...prev, addOnId];
      }
    });
    onChange();
  };
  
  const handleUpgrade = () => {
    // Aqui você implementaria o redirecionamento para o checkout do Stripe
    toast.info(`Processando atualização da assinatura`, {
      description: "Redirecionando para o checkout..."
    });
    onChange();
  };
  
  const handleManageSubscription = () => {
    toast.info("Abrindo gerenciamento de assinatura", {
      description: "Isso redirecionaria para o Portal do Cliente Stripe em produção."
    });
    onChange();
  };
  
  // Determinar se é uma atualização ou nova assinatura
  const isUpgrade = currentPlan.active;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <CreditCard className="mr-2 h-5 w-5 text-cyber-blue" />
        <h3 className="text-lg font-medium">Assinatura GamePath AI</h3>
      </div>
      
      {/* Status da assinatura atual */}
      {currentPlan.active && (
        <Card className="border-cyber-blue">
          <CardHeader className="bg-cyber-blue/10 border-b border-cyber-blue/30">
            <CardTitle className="text-xl flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Seu Plano Atual
            </CardTitle>
            <CardDescription className="text-white">
              Sua assinatura está ativa e funcionando com todos os recursos contratados.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-400">Plano</span>
                <span className="text-lg font-medium text-white">
                  {userTiers.find(t => t.id === currentPlan.userTier)?.name || "Player"}
                </span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-400">Duração</span>
                <span className="text-lg font-medium text-white">
                  {durations.find(d => d.id === currentPlan.duration)?.name || "Mensal"}
                </span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-400">Próxima cobrança</span>
                <span className="text-lg font-medium text-white">
                  {currentPlan.nextBilling.toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Add-ons ativos</h4>
              <div className="flex flex-wrap gap-2">
                {currentPlan.addOns.length > 0 ? (
                  currentPlan.addOns.map(id => {
                    const addon = addOns.find(a => a.id === id);
                    if (!addon) return null;
                    
                    const AddonIcon = addon.icon;
                    
                    return (
                      <Badge key={id} variant="cyber" className="py-1">
                        <AddonIcon className="h-3 w-3 mr-1" /> 
                        {addon.name}
                      </Badge>
                    );
                  })
                ) : (
                  <span className="text-sm text-gray-400">Nenhum add-on ativo</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
            <Button 
              variant="outline" 
              className="border-cyber-blue text-cyber-blue"
              onClick={handleManageSubscription}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Gerenciar Meio de Pagamento
            </Button>
            
            <Button 
              variant="cyberOutline" 
              onClick={handleManageSubscription}
            >
              Gerenciar Assinatura
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Seletor de novo plano */}
      <div className="mt-8">
        <h4 className="text-lg mb-6">Personalizar sua assinatura</h4>
        
        <div className="space-y-8">
          {/* Seleção de tipo de usuário */}
          <div>
            <h5 className="text-md font-medium mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2 text-cyber-blue" />
              Selecione seu tipo de usuário
            </h5>
            
            <RadioGroup 
              defaultValue={selectedUserTier} 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onValueChange={(value) => handleSubscriptionChange(value, selectedDuration)}
            >
              {userTiers.map(tier => (
                <div key={tier.id} className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${selectedUserTier === tier.id 
                    ? 'border-cyber-blue bg-cyber-blue/10' 
                    : 'border-gray-700 hover:border-gray-500'
                  }
                `}>
                  <RadioGroupItem 
                    value={tier.id} 
                    id={`user-tier-${tier.id}`} 
                    className="sr-only"
                  />
                  <label 
                    htmlFor={`user-tier-${tier.id}`}
                    className="flex items-start cursor-pointer"
                  >
                    <div className={`mt-1 w-4 h-4 mr-3 rounded-full border flex items-center justify-center
                      ${selectedUserTier === tier.id ? 'border-cyber-blue' : 'border-gray-600'}
                    `}>
                      {selectedUserTier === tier.id && (
                        <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-white">{tier.name}</h3>
                        <Badge variant="cyber" className="ml-2 py-0">
                          {tier.userCount} {tier.userCount === 1 ? 'usuário' : 'usuários'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{tier.description}</p>
                      <div className="mt-2 font-medium text-cyber-blue">
                        ${(basePrice * tier.priceMultiplier).toFixed(2)}/mês
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Seleção de duração */}
          <div>
            <h5 className="text-md font-medium mb-3 flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-cyber-blue" />
              Selecione a duração da assinatura
            </h5>
            
            <RadioGroup 
              defaultValue={selectedDuration} 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onValueChange={(value) => handleSubscriptionChange(selectedUserTier, value)}
            >
              {durations.map(duration => {
                const price = calculatePrice(selectedUserTier, duration.id, selectedAddOns);
                const originalPrice = price / (1 - duration.discount);
                const showDiscount = duration.discount > 0;
                
                return (
                  <div key={duration.id} className={`
                    border rounded-lg p-4 cursor-pointer transition-all
                    ${selectedDuration === duration.id 
                      ? 'border-cyber-blue bg-cyber-blue/10' 
                      : 'border-gray-700 hover:border-gray-500'
                    }
                  `}>
                    <RadioGroupItem 
                      value={duration.id} 
                      id={`duration-${duration.id}`} 
                      className="sr-only"
                    />
                    <label 
                      htmlFor={`duration-${duration.id}`}
                      className="flex items-start cursor-pointer"
                    >
                      <div className={`mt-1 w-4 h-4 mr-3 rounded-full border flex items-center justify-center
                        ${selectedDuration === duration.id ? 'border-cyber-blue' : 'border-gray-600'}
                      `}>
                        {selectedDuration === duration.id && (
                          <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-white">{duration.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {duration.months} {duration.months === 1 ? 'mês' : 'meses'}
                        </p>
                        <div className="mt-2">
                          {showDiscount && (
                            <span className="text-xs line-through text-gray-400 mr-2">
                              ${originalPrice.toFixed(2)}/mês
                            </span>
                          )}
                          <span className="font-medium text-cyber-blue">
                            ${price.toFixed(2)}/mês
                          </span>
                          {showDiscount && (
                            <Badge variant="cyberGreen" className="ml-2 py-0">
                              -{Math.round(duration.discount * 100)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          
          {/* Seleção de add-ons */}
          <div>
            <h5 className="text-md font-medium mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-cyber-blue" />
              Selecione add-ons (opcional)
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {addOns.map(addon => {
                const isSelected = selectedAddOns.includes(addon.id);
                const isCurrentlyActive = currentPlan.addOns.includes(addon.id);
                const AddonIcon = addon.icon;
                
                return (
                  <div key={addon.id} 
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${isSelected 
                        ? 'border-cyber-purple bg-cyber-purple/10' 
                        : 'border-gray-700 hover:border-gray-500'
                      }
                      ${isCurrentlyActive ? 'border-l-4 border-l-cyber-green' : ''}
                    `}
                    onClick={() => toggleAddOn(addon.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center mr-3
                          ${isSelected ? 'bg-cyber-purple/20' : 'bg-gray-800'}
                        `}>
                          <AddonIcon className={`h-5 w-5 ${isSelected ? 'text-cyber-purple' : 'text-gray-400'}`} />
                        </div>
                        <h3 className="font-medium">{addon.name}</h3>
                      </div>
                      
                      <div className={`
                        w-5 h-5 rounded border flex items-center justify-center
                        ${isSelected ? 'border-cyber-purple bg-cyber-purple/20' : 'border-gray-600'}
                      `}>
                        {isSelected && <Check className="h-3 w-3 text-cyber-purple" />}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400">{addon.description}</p>
                    
                    <div className="mt-2 font-medium">
                      {isCurrentlyActive ? (
                        <span className="text-cyber-green">Ativo</span>
                      ) : (
                        <span className="text-cyber-purple">+${addon.monthlyPrice.toFixed(2)}/mês</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Resumo e checkout */}
          <div>
            <Card className="border-cyber-blue/30 bg-cyber-blue/5">
              <CardHeader>
                <CardTitle>Resumo da assinatura</CardTitle>
                <CardDescription>
                  Todos os planos incluem acesso a todas as regiões geográficas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <div>
                    <p className="text-sm text-gray-300">Plano {userTiers.find(t => t.id === selectedUserTier)?.name}</p>
                    <p className="text-xs text-gray-400">{durations.find(d => d.id === selectedDuration)?.name}</p>
                  </div>
                  <span className="font-medium">
                    ${calculatePrice(selectedUserTier, selectedDuration, selectedAddOns).toFixed(2)}/mês
                  </span>
                </div>
                
                {selectedAddOns.length > 0 && (
                  <div className="space-y-2 pb-2 border-b border-gray-800">
                    {selectedAddOns.map(id => {
                      const addon = addOns.find(a => a.id === id);
                      if (!addon) return null;
                      
                      return (
                        <div key={id} className="flex justify-between items-center text-sm">
                          <span>{addon.name}</span>
                          <span>+${addon.monthlyPrice.toFixed(2)}/mês</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total</p>
                    <p className="text-xs text-gray-400">
                      {durations.find(d => d.id === selectedDuration)?.name === "Mensal"
                        ? "Cobrança mensal"
                        : `Cobrança a cada ${durations.find(d => d.id === selectedDuration)?.months} meses`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-lg text-cyber-blue">
                      ${calculateTotalPrice(selectedUserTier, selectedDuration, selectedAddOns).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {durations.find(d => d.id === selectedDuration)?.months === 1 
                        ? "" 
                        : `(${(calculateTotalPrice(selectedUserTier, selectedDuration, selectedAddOns) / 
                            (durations.find(d => d.id === selectedDuration)?.months || 1)).toFixed(2)}/mês)`
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="cyberAction" 
                  className="w-full"
                  onClick={handleUpgrade}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {isUpgrade ? "Atualizar Assinatura" : "Iniciar Assinatura"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-800">
        <h4 className="text-lg mb-4">Informações de pagamento</h4>
        
        <div className="space-y-4">
          <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
                <Globe className="h-5 w-5 text-cyber-blue" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Acesso Global</h5>
                <p className="text-sm text-gray-400 mt-1">
                  Todos os planos pagos incluem acesso a todas as regiões geográficas sem restrições.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
                <CreditCard className="h-5 w-5 text-cyber-blue" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Pagamento Seguro</h5>
                <p className="text-sm text-gray-400 mt-1">
                  Utilizamos o Stripe para processar pagamentos com segurança. Seus dados de cartão nunca são armazenados em nossos servidores.
                </p>
                <Button 
                  variant="link" 
                  className="text-cyber-blue p-0 h-auto mt-2 flex items-center"
                  onClick={handleManageSubscription}
                >
                  Gerenciar Métodos de Pagamento <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-cyber-red mr-4">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-medium text-sm text-cyber-red">Cancelamento da Assinatura</h5>
                <p className="text-sm text-gray-400 mt-1">
                  Você pode cancelar sua assinatura a qualquer momento através do Portal do Cliente Stripe.
                  Seu acesso continuará até o final do período de cobrança atual.
                </p>
                <Button 
                  variant="link" 
                  className="text-cyber-red p-0 h-auto mt-2"
                  onClick={handleManageSubscription}
                >
                  Gerenciar Assinatura
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettings;

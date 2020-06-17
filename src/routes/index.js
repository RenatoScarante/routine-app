import async from "../components/Async";

import {
  Sliders as SlidersIcon,
  Users as UsersIcon,
  Code as CodeIcon,
  User as UserIcon,
  Key as ApiKeyIcon,
  Search as SearchIcon,
  FileText as ReportIcon,
  DollarSign as MoneyIcon
} from "react-feather";

// Misc
import UnderConstruction from "../pages/misc/UnderConstruction";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Page404 from "../pages/misc/Page404";

// Pages
import Home from "../pages/pages/Home";
import People from "../pages/pages/People";
import Routine from "../pages/pages/Routine";

// Dashboards
const Dashboard = async(() => import("../pages/dashboards/Default"));

// General
const profileRoute = {
  path: "/profile",
  name: "Conta",
  icon: UserIcon,
  component: Account,
  privateRoute: true
};

const searchCompanyRoute = {
  path: "/dashboard/pesquisa-cnpj",
  name: "Pesquisar CNPJ",
  icon: SearchIcon,
  component: SearchCompany
};

// eslint-disable-next-line
const reportsRoutes = {
  path: "/dashboard/relatorios",
  name: "Relatórios",
  icon: ReportIcon,
  header: "Relatórios",
  privateRoute: true,
  children: [
    {
      path: "/dashboard/relatorios/consultas",
      name: "Extrato de consultas",
      component: ReportQueries,
      privateRoute: true
    },
    {
      path: "/dashboard/relatorios/pagamentos",
      name: "Extrato de pagamentos",
      component: ReportPayments,
      privateRoute: true
    }
  ]
};

const apiRestRoutes = {
  path: "/api-rest",
  name: "API Rest",
  icon: CodeIcon,
  header: "Documentação",
  children: [
    // {
    //   path: "/api-rest/consulta-unica",
    //   name: "Consulta Única",
    //   component: ApiRest_ConsultaUnica
    // },
    {
      path: "/api-rest/receita-federal-pj",
      name: "Receita Federal PJ",
      component: ApiRest_ReceitaFederalPJ
    },
    {
      path: "/api-rest/sintegra",
      name: "Sintegra",
      component: ApiRest_Sintegra
    },
    {
      path: "/api-rest/simples-nacional",
      name: "Simples Nacional",
      component: ApiRest_SimplesNacional
    },
    {
      path: "/api-rest/suframa",
      name: "Suframa",
      component: ApiRest_Suframa
    },
    {
      path: "/api-rest/receita-federal-pf",
      name: "Receita Federal PF",
      component: ApiRest_ReceitaFederalPF
    }
  ]
};

// eslint-disable-next-line
const apiGraphQLRoutes = {
  path: "/api-graphql-docs",
  name: "API GraphQL",
  icon: CodeIcon,
  children: [
    {
      path: "/api-graphql-docs/receita-federal-pj",
      name: "Receita Federal PJ",
      component: ApiRest_ReceitaFederalPJ
    },
    {
      path: "/api-graphql-docs/sintegra",
      name: "Sintegra",
      component: UnderConstruction
    },
    {
      path: "/api-graphql-docs/simples-nacional",
      name: "Simples Nacional",
      component: UnderConstruction
    },
    {
      path: "/api-graphql-docs/suframa",
      name: "Suframa",
      component: UnderConstruction
    },
    {
      path: "/api-graphql-docs/receita-federal-pf",
      name: "Receita Federal PF",
      component: UnderConstruction
    }
  ]
};

const apiKeyRoute = {
  path: "/dashboard/api-key",
  name: "API KEY",
  icon: ApiKeyIcon,
  header: "Configurações",
  component: ApiKey,
  privateRoute: true
};

const planRoute = {
  path: "/ManagePlans/upgrade",
  icon: MoneyIcon,
  name: "Upgrade",
  component: Upgrade,
  privateRoute: true
};

// Routes
const landingRoutes = {
  path: "/",
  name: "Home Page",
  component: Landing,
  children: null
};

const generalRoutes = {
  path: "/nudata",
  name: "nuData",
  children: [
    {
      path: "/ManagePlans/planConfirmation/:planId",
      name: "ConfirmarPlano",
      component: PlanConfirmation,
      privateRoute: true
    },
    {
      path: "/suporte",
      name: "Suporte",
      component: Support
    },
    {
      path: "/suporte/chat",
      name: "Suporte",
      component: Support
    },
    {
      path: "/termos-uso-software",
      name: "Termos de uso do software",
      component: ServicesAgreement
    },
    {
      path: "/termos-de-uso",
      name: "Termos de uso gerais",
      component: TermsOfUse
    },
    {
      path: "/politica-de-privacidade",
      name: "Política de Privacidade",
      component: PrivacyPolicy
    },
    {
      path: "/solicitar-privacidade",
      name: "Solicitar Privacidade",
      component: RequestPrivacy
      //privateRoute: true
    },
    {
      path: "/confirmar-privacidade/:token",
      name: "Confirmação Privacidade",
      component: PrivacyConfirm
      //privateRoute: true
    },
    {
      path: "/confirmacao-email/:token",
      name: "Confirmação de email",
      component: VerifyEmail
      //privateRoute: true
    },
    {
      path: "/sobre",
      name: "Sobre",
      component: AboutPage
    }
  ]
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  component: Dashboard,
  header: "Principal",
  icon: SlidersIcon,
  containsHome: true,
  privateRoute: true
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  children: [
    {
      path: "/auth/login",
      name: "Login",
      component: Login
    },
    {
      path: "/auth/registre-se",
      name: "Registre-se",
      component: Register
    },
    {
      path: "/auth/esqueci-a-senha",
      name: "Esqueci a senha",
      component: ForgotPassword
    },
    {
      path: "/auth/recuperar-a-senha/:token",
      name: "Recuperar a senha",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  searchCompanyRoute,
  //reportsRoutes,
  apiRestRoutes,
  //apiGraphQLRoutes,
  apiKeyRoute,
  planRoute,
  profileRoute
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const auth = [authRoutes];

// General routes
export const general = [generalRoutes];

// All routes
export default [
  dashboardRoutes,
  searchCompanyRoute,
  //reportsRoutes,
  apiRestRoutes,
  //apiGraphQLRoutes,
  apiKeyRoute,
  planRoute,
  profileRoute
];

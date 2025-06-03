import React from 'react';

interface TechIconProps {
  tech: string;
  size?: number;
  className?: string;
}

export function TechIcon({ tech, size = 24, className = '' }: TechIconProps) {
  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();

    // Map common tech names to their icon URLs
    const iconMap: { [key: string]: string } = {
      react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      typescript:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      javascript:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      postgresql:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      stripe: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg',
      'd3.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg',
      websocket:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
      express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      'react native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      'vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      angular:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
      mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      kubernetes:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      tailwind:
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      photoshop: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    };

    return (
      iconMap[name] ||
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'
    );
  };

  return (
    <img
      src={getTechIcon(tech)}
      alt={tech}
      width={size}
      height={size}
      className={`flex-shrink-0 ${className}`}
      onError={e => {
        // Fallback to a generic tech icon if the specific one fails to load
        e.currentTarget.src =
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';
      }}
    />
  );
}
